import LibraryItem from "../models/LibraryItem.js";
import { getRecommendations } from "../../services/recommendationService.js";

export const getUserRecommendations = async (req, res) => {
    try {
        // Get user's library history
        const libraryItems = await LibraryItem.find({
            userId: req.user._id,
            status: { $in: ["watching", "completed"] }
        });

        // Extract content IDs
        const userHistory = libraryItems.map(
            item => item.externalId
        );

        // Get recommendations from ML service
        const recommendations = await getRecommendations(
            userHistory,
            10
        );

        return res.status(200).json({
            success: true,
            data: recommendations
        });

    } catch (error) {
        console.error(
            "Error getting recommendations:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get recommendations"
        });
    }
};