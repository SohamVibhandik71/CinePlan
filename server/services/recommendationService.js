import axios from "axios";

const ML_SERVICE_URL = "http://127.0.0.1:8000";

export const getRecommendations = async (
    userHistory,
    topN = 10
) => {
    try {
        const response = await axios.post(
            `${ML_SERVICE_URL}/recommend`,
            {
                user_history: userHistory,
                top_n: topN
            }
        );

        return response.data.recommendations;

    } catch (error) {
        console.error(
            "Recommendation service error:",
            error.response?.data || error.message
        );

        throw new Error(
            "Failed to get recommendations from ML service"
        );
    }
};