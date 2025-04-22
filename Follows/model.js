import mongoose from "mongoose";
import followSchema from "./schema.js";

const model = mongoose.model("FollowModel", followSchema);
export default model;
