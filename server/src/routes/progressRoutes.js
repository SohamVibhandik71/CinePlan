import express from "express";
import {
  markEpisodeWatched,
  getContentProgress,
  updateEpisodeProgress,
  getProgressSummary
} from "../controllers/progressController.js";
import { protectRoute } from "../middlewares/auth.js";

const progressRouter = express.Router();

progressRouter.post("/", protectRoute, markEpisodeWatched);
progressRouter.get("/:contentId/summary", protectRoute, getProgressSummary);
progressRouter.get("/:contentId", protectRoute, getContentProgress);
progressRouter.patch("/:id", protectRoute, updateEpisodeProgress);


export default progressRouter;