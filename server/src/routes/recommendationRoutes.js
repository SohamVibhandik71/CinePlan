import express from "express";
import { getUserRecommendations } from "../controllers/recommendationController.js";
import { protectRoute } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    protectRoute,
    getUserRecommendations
);

export default router;