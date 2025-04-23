import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createReview = (review) => {
  const newReview = { ...review, _id: uuidv4() };
  return model.create(newReview);
};

export const findAllReviews = () => model.find();

export const findReviewById = (reviewId) => model.findById(reviewId);

export const findReviewsByUsername = (username) =>
  model.findOne({ username: username });

export const updateReview = (reviewId, text) =>
  model.updateOne({ _id: reviewId }, { $set: text });

export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
