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

export const mapTVDetails = (show) => {
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

        genres: show.genres.map((genre) => ({
            id: genre.id,
            name: genre.name
        })),

        rating: show.vote_average,
        voteCount: show.vote_count,

        firstAirDate: show.first_air_date,
        lastAirDate: show.last_air_date,

        status: show.status,
        tagline: show.tagline,

        numberOfSeasons: show.number_of_seasons,
        numberOfEpisodes: show.number_of_episodes,

        originalLanguage: show.original_language,
        popularity: show.popularity,

        seasons: show.seasons?.map((season) => ({
            id: season.id,
            seasonNumber: season.season_number,
            name: season.name,
            overview: season.overview,
            airDate: season.air_date,
            episodeCount: season.episode_count,
            poster: season.poster_path
                ? `${TMDB_IMAGE_BASE_URL}/w500${season.poster_path}`
                : null
        })) || [],

        cast: show.credits?.cast?.slice(0, 10).map((person) => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profile: person.profile_path
                ? `${TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`
                : null
        })) || []
    };
};

export const mapTVSeason = (season) => {
    return {
        id: season.id,
        seasonNumber: season.season_number,
        name: season.name,
        overview: season.overview,
        airDate: season.air_date,

        poster: season.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${season.poster_path}`
            : null,

        episodeCount: season.episodes?.length || 0,

        episodes: season.episodes?.map((episode) => ({
            id: episode.id,
            episodeNumber: episode.episode_number,
            name: episode.name,
            overview: episode.overview,
            airDate: episode.air_date,
            runtime: episode.runtime,
            rating: episode.vote_average,

            still: episode.still_path
                ? `${TMDB_IMAGE_BASE_URL}/w500${episode.still_path}`
                : null
        })) || []
    };
};

export const mapProviders = (data, country = "IN") => {
    const countryData = data.results?.[country];

    if (!countryData) {
        return {
            country,
            link: null,
            flatrate: [],
            rent: [],
            buy: []
        };
    }

    const mapProvider = (provider) => ({
        id: provider.provider_id,
        name: provider.provider_name,
        logo: provider.logo_path
            ? `${TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`
            : null
    });

    return {
        country,
        link: countryData.link || null,

        flatrate: countryData.flatrate?.map(mapProvider) || [],

        rent: countryData.rent?.map(mapProvider) || [],

        buy: countryData.buy?.map(mapProvider) || []
    };
};