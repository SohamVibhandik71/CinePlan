import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        //connect to the database
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Failed to start server:", error);
        process.exit(1);
        
    }
};

startServer();