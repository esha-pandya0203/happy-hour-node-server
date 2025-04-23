import * as dao from "./dao.js";

export default function FollowRoutes(app) {
  // get all follows
  app.get("/api/follows", async (req, res) => {
    const follows = await dao.findAllFollows();
    res.json(follows);
  });

  // follow a user
  app.post("/api/follows", async (req, res) => {
    const follow = req.body;
    const created = await dao.createFollow(follow);
    res.json(created);
  });

  // unfollow a user
  app.delete("/api/follows", async (req, res) => {
    const { follower_id, followee_id } = req.body;
    const status = await dao.deleteFollow(follower_id, followee_id);
    res.json(status);
  });

  // get all followees of a user
  app.get("/api/follows/following/:follower_id", async (req, res) => {
    const followees = await dao.findFollowees(req.params.follower_id);
    res.json(followees);
  });

  // get all followers of a user
  app.get("/api/follows/followers/:followee_id", async (req, res) => {
    const followers = await dao.findFollowers(req.params.followee_id);
    res.json(followers);
  });
}
