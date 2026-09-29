const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const mapMovie = (movie) => {
    return {
        id: movie.id,
        title: movie.title,
        type: "movie",
        poster: movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
            : null,
        backdrop: movie.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
            : null,
        overview: movie.overview,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        popularity: movie.popularity
    };
};

export const mapMovies = (movies) => {
    return movies.map(mapMovie);
};

export const mapTV = (show) => {
    return {
        id: show.id,
        title: show.name,
        type: "tv",
        poster: show.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${show.poster_path}`
            : null,
        backdrop: show.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}/original${show.backdrop_path}`
            : null,
        overview: show.overview,
        rating: show.vote_average,
        releaseDate: show.first_air_date,
        popularity: show.popularity
    };
};

export const mapTVShows = (shows) => {
    return shows.map(mapTV);
};

export const mapAnimeMovie = (movie) => {
    return {
        ...mapMovie(movie),
        type: "anime"
    };
};

export const mapAnimeTV = (show) => {
    return {
        ...mapTV(show),
        type: "anime"
    };
};

export const mapSearchResult = (item) => {
    if (item.media_type === "movie") {
        return mapMovie(item);
    }

    if (item.media_type === "tv") {
        return mapTV(item);
    }

    return null;
};
export const mapMovieDetails = (movie) => {
    return {
        id: movie.id,
        title: movie.title,
        type: "movie",

        poster: movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
            : null,

        backdrop: movie.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
            : null,

        overview: movie.overview,

        genres: movie.genres.map((genre) => ({
            id: genre.id,
            name: genre.name
        })),

        rating: movie.vote_average,
        voteCount: movie.vote_count,

        releaseDate: movie.release_date,
        runtime: movie.runtime,

        status: movie.status,
        tagline: movie.tagline,

        originalLanguage: movie.original_language,

        popularity: movie.popularity,

        cast: movie.credits?.cast?.slice(0, 10).map((person) => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profile: person.profile_path
                ? `${TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`
                : null
        })) || []
    };
};