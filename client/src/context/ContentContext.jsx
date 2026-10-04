import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);

  const [tvShows, setTvShows] = useState([]);
  const [tvLoading, setTvLoading] = useState(false);
  const [tvError, setTvError] = useState(null);

  const [anime, setAnime] = useState([]);
  const [animeLoading, setAnimeLoading] = useState(false);
  const [animeError, setAnimeError] = useState(null); 

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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};