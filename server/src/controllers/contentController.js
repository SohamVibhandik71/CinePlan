import getPopularMovies from "../../services/tmdbServices.js";

export const getMovies = async (req, res) => {
    try {
        const movies = await getPopularMovies();

        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        console.error("Error fetching movies:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch movies"
        });
    }
};