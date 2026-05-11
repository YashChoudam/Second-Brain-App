// Package imports
import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";

// Models and files import
import { userModel } from "../models/user.model.js";
import {authUser} from "../middlewares/user.middleware.js"

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
        message: "User already exists ",
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
        email
    });

    if (!response) {
        return res.status(404).json({
            message: "User does not exist with this email"
        });
    }
    const passwordMatch = await bcrypt.compare(password,response.password);
    if (passwordMatch) {
        const token = jwt.sign(
            {
                id: response._id,
                email: response.email,
            },
            userJwtSecret
        );
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Incorrect Credentials"});
    }
});


export {userRoutes} ;