import express from "express";
import {
    getMovies,
    getTVShows,
    getAnime,
    search,
    getMovie
} from "../controllers/contentController.js";


const contentRouter = express.Router();

contentRouter.get("/movies", getMovies);
contentRouter.get("/tv", getTVShows);
contentRouter.get("/anime", getAnime);
contentRouter.get("/search", search);
contentRouter.get("/movie/:id", getMovie);

export default contentRouter;