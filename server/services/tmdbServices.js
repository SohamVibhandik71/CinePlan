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

const getPopularTV = async () => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/tv/popular`,
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

const getAnimeMovies = async (page = 1) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/discover/movie`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                },
                params: {
                    with_genres: 16,
                    with_origin_country: "JP",
                    include_adult: false,
                    page
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB Anime Movie API Error:", error.message);
        throw error;
    }
};

const getAnimeTV = async (page = 1) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/discover/tv`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                },
                params: {
                    with_genres: 16,
                    with_origin_country: "JP",
                    include_adult: false,
                    page
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB Anime TV API Error:", error.message);
        throw error;
    }
};
const searchContent = async (query, page = 1) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/search/multi`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                },
                params: {
                    query,
                    page,
                    include_adult: false
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB Search API Error:", error.message);
        throw error;
    }
};

const getMovieDetails = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                },
                params: {
                    append_to_response: "credits"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB Movie Details API Error:", error.message);
        throw error;
    }
};
export {
    getPopularMovies,
    getPopularTV,
    getAnimeMovies,
    getAnimeTV,
    searchContent,
    getMovieDetails
};