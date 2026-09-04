import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Status
app.use("/api/status", (req, res) => {
    res.send("Server is Live!");
});

//routes
app.use("/api/user", userRouter)

export default app;