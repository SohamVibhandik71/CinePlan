import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("server is connected!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})