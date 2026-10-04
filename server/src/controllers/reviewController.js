import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const {
      contentId,
      contentType,
      rating,
      review
    } = req.body;

    if (!contentId || !contentType || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "contentId, contentType and rating are required"
      });
    }

    const existingReview = await Review.findOne({
      userId: req.user._id,
      contentId,
      contentType
    });

    if (existingReview) {
      existingReview.rating = rating;

      if (review !== undefined) {
        existingReview.review = review;
      }

      await existingReview.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: existingReview
      });
    }

    const newReview = await Review.create({
      userId: req.user._id,
      contentId,
      contentType,
      rating,
      review: review || ""
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview
    });

  } catch (error) {
    console.error("Error creating review:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create review"
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { contentId } = req.params;

    const reviews = await Review.find({ contentId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const totalRatings = reviews.length;

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / totalRatings
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        averageRating,
        totalRatings,
        reviews
      }
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews"
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting review:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete review"
    });
  }
};