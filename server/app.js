import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import contentRouter from "./src/routes/contentRoutes.js";
import libraryRouter from "./src/routes/libraryRoutes.js";
import progressRouter from "./src/routes/progressRoutes.js";

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
app.use("/api/user", userRouter);
app.use("/api/content",contentRouter);
app.use("/api/library", libraryRouter);
app.use("/api/progress", progressRouter);
export default app;