import express from "express";
import {
  createReview,
  getReviews
} from "../controllers/reviewController.js";
import { protectRoute } from "../middlewares/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/", protectRoute, createReview);
reviewRouter.get("/:contentId", getReviews);



export default reviewRouter;