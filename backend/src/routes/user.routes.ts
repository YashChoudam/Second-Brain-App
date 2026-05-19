// Package imports
import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";
import crypto from "crypto";

// Models and files import
import { userModel } from "../models/user.model.js";
import { contentModel } from "../models/content.model.js";
import { linkModel } from "../models/link.models.js";
import { tagModel } from "../models/tag.models.js";
import { authUser } from "../middlewares/user.middleware.js";

const userRoutes = Router();

userRoutes.use(express.json());

//Signup
userRoutes.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    res.status(200).send({ message: "Signed Up successfully " });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    return res.json({ message: "Database error" });
  }
});

// Login
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userJwtSecret = process.env.JWT_USERSECRET;

  if (!userJwtSecret) {
    throw new Error("JWT_USERSECRET is missing");
  }

  const response = await userModel.findOne({
    email,
  });

  if (!response) {
    return res.status(404).json({
      message: "User does not exist with this email",
    });
  }
  const passwordMatch = await bcrypt.compare(password, response.password);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id,
        email: response.email,
      },
      userJwtSecret,
    );
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Incorrect Credentials" });
  }
});

userRoutes.post("/content", authUser, async (req, res) => {
  const { link, type, title, tags } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const content = await contentModel.create({
      link: link,
      type: type,
      title: title,
      tags: tags,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Content added successfully",
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while adding content",
    });
  }
});

userRoutes.get("/content", authUser, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }
    const content = await contentModel
      .find({
        userId: req.user.id,
      })
      .populate("tags");
    return res.status(200).json({
      message: "Content fetched Successfully",
      content,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching content",
    });
  }
});

userRoutes.delete("/content/:contentId", authUser, async (req, res) => {
  const { contentId } = req.params;
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    const deletedContent = await contentModel.findOneAndDelete({
      _id: contentId,
      userId: req.user.id,
    });
    if (!deletedContent) {
      return res.status(404).json({
        message: "Content not found or you are not allowed to delete it",
      });
    }
    return res.status(200).json({
      message: "Content deleted successfully",
      deletedContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting content",
    });
  }
});

userRoutes.post("/brain/share", authUser, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const existingLink = await linkModel.findOne({
      userId: req.user.id,
    });
    if (existingLink) {
      return res.status(200).json({
        message: "Share link already exists ",
        hash: existingLink.hash,
        shareUrl: `/api/v1/user/brain/${existingLink.hash}`,
      });
    }
    const hash = crypto.randomBytes(16).toString("hex");

    const link = await linkModel.create({
      hash,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Share link created successfully",
      hash: link.hash,
      shareUrl: `/api/v1/user/brain/${link.hash}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating sharable link",
    });
  }
});
export { userRoutes };
