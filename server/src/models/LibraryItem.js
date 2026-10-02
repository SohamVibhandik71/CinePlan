import mongoose from "mongoose";

const libraryItemSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        externalId: {
            type: Number,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: ["movie", "tv", "anime"],
            required: true
        },

        poster: {
            type: String,
            default: null
        },

        genres: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: ["planned", "watching", "completed"],
            default: "planned"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        progress: {
            type: Number,
            default: 0,
            min: 0
        },

        addedAt: {
            type: Date,
            default: Date.now
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

//to prevent adding same item multiple times
libraryItemSchema.index(
    { userId: 1, externalId: 1, type: 1 },
    { unique: true }
);

const LibraryItem = mongoose.model("LibraryItem", libraryItemSchema);

export default LibraryItem;