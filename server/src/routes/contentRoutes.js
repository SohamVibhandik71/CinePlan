import express from "express";
import { getMovies } from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.get("/movies", getMovies);

export default contentRouter;