import mongoose from "mongoose";
import reviewSchema from "./schema.js";

const model = mongoose.model("ReviewModel", reviewSchema);
export default model;
