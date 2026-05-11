import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export { userModel };
