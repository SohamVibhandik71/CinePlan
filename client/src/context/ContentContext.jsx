import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";



const ContentContext = createContext();

export const ContentProvider = ({ children }) => {

  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);

  const [tvShows, setTvShows] = useState([]);
  const [tvLoading, setTvLoading] = useState(false);
  const [tvError, setTvError] = useState(null);

  const [anime, setAnime] = useState([]);
  const [animeLoading, setAnimeLoading] = useState(false);
  const [animeError, setAnimeError] = useState(null); 

  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState(null);

 const fetchMovies = async () => {
  try {
    console.log("Movies: request started");

    setMoviesLoading(true);
    setMoviesError(null);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/content/movies`
    );

    console.log("Movies: response received", response.data);

    const data = response.data;

    if (data.success) {
      setMovies(data.data.results);
    } else {
      setMoviesError(data.message || "Failed to fetch movies");
    }
  } catch (error) {
    console.error("Movies error:", error);

    setMoviesError(
      error.response?.data?.message || "Failed to fetch movies"
    );
  } finally {
    console.log("Movies: loading finished");
    setMoviesLoading(false);
  }
};
  const fetchTVShows = async () => {
    try {
        console.log("TV: request started");
        setTvLoading(true);
        setTvError(null);

        const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/content/tv`
        );

        console.log("TV: response received", response.data);

        const data = response.data;

        if (data.success) {
        setTvShows(data.data.results);
        } else {
        setTvError(data.message || "Failed to fetch TV shows");
        }
    } catch (error) {
        console.error("Error fetching TV shows:", error);

        setTvError(
        error.response?.data?.message || "Failed to fetch TV shows"
        );
    } finally {
        console.log("TV: loading finished");
        setTvLoading(false);
    }
    };



  const fetchAnime = async () => {
    try {
        setAnimeLoading(true);
        setAnimeError(null);

        const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/content/anime`
        );

        const data = response.data;

        if (data.success) {
        setAnime(data.data.results);
        } else {
        setAnimeError(data.message || "Failed to fetch anime");
        }
    } catch (error) {
        console.error("Error fetching anime:", error);

        setAnimeError(
        error.response?.data?.message || "Failed to fetch anime"
        );
    } finally {
        setAnimeLoading(false);
    }
  };

  const searchContent = async (query) => {
    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/content/search`,
        {
          params: {
            query: query.trim(),
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setSearchResults(data.data.results);
      } else {
        setSearchError(data.message || "Failed to search content");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching content:", error);

      setSearchError(
        error.response?.data?.message || "Failed to search content"
      );

      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setRecommendationsLoading(true);
      setRecommendationsError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setRecommendations(data.data);
      } else {
        setRecommendationsError(
          data.message || "Failed to fetch recommendations"
        );
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);

      setRecommendationsError(
        error.response?.data?.message ||
          "Failed to fetch recommendations"
      );
    } finally {
      setRecommendationsLoading(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        movies,
        moviesLoading,
        moviesError,
        fetchMovies,

        tvShows,
        tvLoading,
        tvError,
        fetchTVShows,

        anime,
        animeLoading,
        animeError,
        fetchAnime,

        searchResults,
        searchLoading,
        searchError,
        searchContent,

        recommendations,
        recommendationsLoading,
        recommendationsError,
        fetchRecommendations,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};