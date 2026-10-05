from fastapi import FastAPI
from pydantic import BaseModel

from src.models.recommender import Recommender


app = FastAPI(
    title="CinePlan Recommendation API",
    description="ML recommendation service for CinePlan",
    version="1.0.0"
)


# Load the recommendation model once when the API starts
recommender = Recommender()

#define the request model for recommendations
class RecommendationRequest(BaseModel):
    user_history: list[int]
    top_n: int = 10


@app.get("/")
def root():
    return {
        "message": "CinePlan Recommendation API is running"
    }


@app.post("/recommend")
def get_recommendations(request: RecommendationRequest):

    recommendations = recommender.recommend(
        request.user_history,
        request.top_n
    )

    return {
        "recommendations": recommendations
    }