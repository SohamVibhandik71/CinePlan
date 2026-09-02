import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/cineplan`
        );

        console.log("Database Connected!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};

export default connectDB;