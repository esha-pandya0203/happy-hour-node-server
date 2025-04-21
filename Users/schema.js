import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: String, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["over21", "under21"], 
      default: "under21",
    },
    savedDrinks: [{ type: String, ref: "Drink" }], 
  },
  { collection: "users" }
);

export default userSchema; 
