import mongoose from "mongoose";

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const linkSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userId: {
      type: objectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const linkModel = mongoose.model("Link", linkSchema);

export { linkModel };
