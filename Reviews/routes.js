import * as dao from "./dao.js";

export default function ReviewRoutes(app) {
  // get all reviews
  // if role is passed, filter by role
  app.get("/api/reviews", async (req, res) => {
    const reviews = await dao.findAllReviews();
    res.json(reviews);
  });

  // create a review
  app.post("/api/reviews", async (req, res) => {
    const review = await dao.createReview(req.body);
    res.json(review);
  });

  // get review by ID
  app.get("/api/reviews/:reviewId", async (req, res) => {
    const review = await dao.findReviewById(req.params.reviewId);
    res.json(review);
  });

  // update review by ID
  app.put("/api/reviews/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const reviewUpdates = req.body;
    await dao.updateReview(reviewId, reviewUpdates);
    const currentReview = req.session["currentReview"];

    if (currentReview && currentReview._id === reviewId) {
      req.session["currentReview"] = { ...currentReview, ...reviewUpdates };
    }

    res.json(currentReview);
  });

  // remove review by ID
  app.delete("/api/reviews/:reviewId", async (req, res) => {
    const status = await dao.deleteReview(req.params.reviewId);
    res.json(status);
  });
}
