import express from "express";
import {
    getMovies,
    getTVShows,
    getAnime,
    search,
    getMovie,
    getTVShow,
    getTVSeason,
    getMovieProviderDetails,
    getTVProviderDetails
} from "../controllers/contentController.js";


const contentRouter = express.Router();

contentRouter.get("/movies", getMovies);
contentRouter.get("/tv", getTVShows);
contentRouter.get("/anime", getAnime);
contentRouter.get("/search", search);
contentRouter.get("/movie/:id/providers", getMovieProviderDetails);
contentRouter.get("/movie/:id", getMovie);
contentRouter.get("/tv/:id/season/:season", getTVSeason);
contentRouter.get("/tv/:id/providers", getTVProviderDetails);
contentRouter.get("/tv/:id", getTVShow);
export default contentRouter;