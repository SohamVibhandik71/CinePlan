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

const getTVDetails = async (id) => {
    try {
        const detailsResponse = await axios.get(
            `${process.env.TMDB_BASE_URL}/tv/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        const creditsResponse = await axios.get(
            `${process.env.TMDB_BASE_URL}/tv/${id}/credits`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        return {
            ...detailsResponse.data,
            credits: creditsResponse.data
        };

    } catch (error) {
        console.error("TMDB TV Details API Error:", error.message);
        throw error;
    }
};

const getTVSeasonDetails = async (id, seasonNumber) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB TV Season API Error:", error.message);
        throw error;
    }
};

const getMovieProviders = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/movie/${id}/watch/providers`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB Movie Providers API Error:", error.message);
        throw error;
    }
};

const getTVProviders = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/tv/${id}/watch/providers`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("TMDB TV Providers API Error:", error.message);
        throw error;
    }
};

const getTVSeasons = async (id) => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/tv/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
      }
    }
  );

  return response;
};

export {
    getPopularMovies,
    getPopularTV,
    getAnimeMovies,
    getAnimeTV,
    searchContent,
    getMovieDetails,
    getTVDetails,
    getTVSeasonDetails,
    getMovieProviders,
    getTVProviders,
    getTVSeasons
};