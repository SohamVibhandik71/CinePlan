import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    contentId: {
      type: Number,
      required: true
    },

    contentType: {
      type: String,
      enum: ["movie", "tv", "anime"],
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    review: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index(
  {
    userId: 1,
    contentId: 1,
    contentType: 1
  },
  {
    unique: true
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;