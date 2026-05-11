import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const tagModel = mongoose.model("Tag", tagSchema);

export { tagModel };
