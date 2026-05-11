import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const contentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["image", "video", "article", "tweet", "document"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: objectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: objectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const contentModel = mongoose.model("Content", contentSchema);

export { contentModel };
