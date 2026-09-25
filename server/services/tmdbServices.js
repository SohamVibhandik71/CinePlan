import axios from "axios";

const getPopularMovies = async () => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/popular`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB API Error:", error.message);
        throw error;
    }
};

export default getPopularMovies;