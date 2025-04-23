import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createFollow = (follow) => {
  const newFollow = { ...follow, _id: uuidv4() };
  return model.create(newFollow);
};

export const findAllFollows = () => model.find();

export const findFollowees = (follower_id) =>
  model.find({ follower_id: follower_id }).populate("followee_id");

export const findFollowers = (followee_id) =>
  model.find({ followee_id: followee_id }).populate("follower_id");

export const deleteFollow = (follower_id, followee_id) =>
  model.deleteOne({ follower_id: follower_id, followee_id: followee_id });
