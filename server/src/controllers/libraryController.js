import LibraryItem from "../models/LibraryItem.js";

export const addToLibrary = async (req, res) => {
    try {
        const {
            externalId,
            title,
            type,
            poster,
            genres,
            priority
        } = req.body;

        // Validate required fields
        if (!externalId || !title || !type) {
            return res.status(400).json({
                success: false,
                message: "externalId, title and type are required"
            });
        }

        // Check if content already exists in user's library
        const existingItem = await LibraryItem.findOne({
            userId: req.user._id,
            externalId,
            type
        });

        if (existingItem) {
            return res.status(409).json({
                success: false,
                message: "Content already exists in your library"
            });
        }

        const libraryItem = await LibraryItem.create({
            userId: req.user._id,
            externalId,
            title,
            type,
            poster: poster || null,
            genres: genres || [],
            priority: priority || "medium"
        });

        return res.status(201).json({
            success: true,
            message: "Content added to library",
            data: libraryItem
        });

    } catch (error) {
        console.error("Error adding to library:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add content to library"
        });
    }
};

export const getLibrary = async (req, res) => {
    try {
        const library = await LibraryItem.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: library
        });

    } catch (error) {
        console.error("Error fetching library:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch library"
        });
    }
};

export const updateLibraryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            status,
            priority,
            progress
        } = req.body;

        const libraryItem = await LibraryItem.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!libraryItem) {
            return res.status(404).json({
                success: false,
                message: "Library item not found"
            });
        }

        if (status !== undefined) {
            libraryItem.status = status;
        }

        if (priority !== undefined) {
            libraryItem.priority = priority;
        }

        if (progress !== undefined) {
            libraryItem.progress = progress;
        }

        if (status === "completed") {
            libraryItem.completedAt = new Date();
        }

        await libraryItem.save();

        return res.status(200).json({
            success: true,
            message: "Library item updated successfully",
            data: libraryItem
        });

    } catch (error) {
        console.error("Error updating library item:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update library item"
        });
    }
};

export const deleteLibraryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const libraryItem = await LibraryItem.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!libraryItem) {
            return res.status(404).json({
                success: false,
                message: "Library item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Content removed from library"
        });

    } catch (error) {
        console.error("Error deleting library item:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove content from library"
        });
    }
};