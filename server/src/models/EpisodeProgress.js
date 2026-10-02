import mongoose from "mongoose";

const episodeProgressSchema = new mongoose.Schema(
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

        seasonNumber: {
            type: Number,
            required: true,
            min: 0
        },

        episodeNumber: {
            type: Number,
            required: true,
            min: 1
        },

        watched: {
            type: Boolean,
            default: false
        },

        watchedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

episodeProgressSchema.index(
    {
        userId: 1,
        contentId: 1,
        seasonNumber: 1,
        episodeNumber: 1
    },
    {
        unique: true
    }
);

const EpisodeProgress = mongoose.model(
    "EpisodeProgress",
    episodeProgressSchema
);

export default EpisodeProgress;