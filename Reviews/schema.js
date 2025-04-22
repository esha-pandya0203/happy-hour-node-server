import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    _id: String,
    user_id: { type: String, ref: "UserModel", required: true },
    drink_id: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);

export default reviewSchema;
