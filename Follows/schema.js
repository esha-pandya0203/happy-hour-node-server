import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    _id: String,
    follower_id: { type: String, ref: "UserModel", required: true },
    followee_id: { type: String, ref: "UserModel", required: true },
  },
  { collection: "follows" }
);

export default followSchema;
