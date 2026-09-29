import {
    getPopularMovies,
    getPopularTV,
    getAnimeMovies,
    getAnimeTV,
    searchContent,
    getMovieDetails
} from "../../services/tmdbServices.js";

import {
    mapMovies,
    mapTVShows,
    mapAnimeMovie,
    mapAnimeTV,
    mapSearchResult,
    mapMovieDetails
} from "../utils/contentMapper.js";


export const getMovies = async (req, res) => {
    try {
        const movies = await getPopularMovies();

        const mappedMovies = mapMovies(movies.results);

        res.status(200).json({
            success: true,
            data: {
                page: movies.page,
                results: mappedMovies,
                total_pages: movies.total_pages,
                total_results: movies.total_results
            }
        });
    } catch (error) {
        console.error("Error fetching movies:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch movies"
        });
    }
};

export const getTVShows = async (req, res) => {
    try {
        const shows = await getPopularTV();

        const mappedShows = mapTVShows(shows.results);

        res.status(200).json({
            success: true,
            data: {
                page: shows.page,
                results: mappedShows,
                total_pages: shows.total_pages,
                total_results: shows.total_results
            }
        });
    } catch (error) {
        console.error("Error fetching TV shows:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch TV shows"
        });
    }
};

export const getAnime = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;

        const [movies, tvShows] = await Promise.all([
            getAnimeMovies(page),
            getAnimeTV(page)
        ]);

        const animeMovies = movies.results.map(mapAnimeMovie);
        const animeTV = tvShows.results.map(mapAnimeTV);

        const results = [...animeMovies, ...animeTV]
            .sort((a, b) => b.popularity - a.popularity);

        res.status(200).json({
            success: true,
            data: {
                page,
                results
            }
        });
    } catch (error) {
        console.error("Error fetching anime:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch anime"
        });
    }
};

export const search = async (req, res) => {
    try {
        const { query } = req.query;
        const page = Number(req.query.page) || 1;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const results = await searchContent(query.trim(), page);

        const mappedResults = results.results
            .map(mapSearchResult)
            .filter(Boolean);

        res.status(200).json({
            success: true,
            data: {
                page: results.page,
                results: mappedResults,
                total_pages: results.total_pages,
                total_results: results.total_results
            }
        });
    } catch (error) {
        console.error("Error searching content:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to search content"
        });
    }
};

export const getMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await getMovieDetails(id);

        const mappedMovie = mapMovieDetails(movie);


        res.status(200).json({
            success: true,
            data: mappedMovie
        });
    } catch (error) {
        console.error("Error fetching movie details:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch movie details"
        });
    }
};