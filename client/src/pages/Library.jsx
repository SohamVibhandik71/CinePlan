import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Library as LibraryIcon,
} from "lucide-react";

import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

import { useLibrary } from "../context/LibraryContext";

const Library = () => {
  const {
    library,
    libraryLoading,
    libraryError,
    deleteLibraryItem,
  } = useLibrary();

  const [selectedMovie, setSelectedMovie] = useState(null);

  // =====================================================
  // CONVERT LIBRARY ITEM TO MOVIECARD FORMAT
  // =====================================================

  const formatMovie = (item) => {
    return {
      ...item,

      name: item.title,

      // MongoDB document ID
      libraryId: item._id,

      // TMDB ID
      id: item.id || item.externalId,

      externalId: item.externalId,

      poster: item.poster,

      type: item.type,

      status: item.status,

      genres: item.genres,

      priority: item.priority,

      progress: item.progress,
    };
  };

  // =====================================================
  // FILTER BY STATUS
  // =====================================================

  const continueWatching = library
    .filter((item) => item.status === "watching")
    .map(formatMovie);

  const futurePlans = library
    .filter((item) => item.status === "planned")
    .map(formatMovie);

  const completed = library
    .filter((item) => item.status === "completed")
    .map(formatMovie);

  // =====================================================
  // DELETE MOVIE FROM LIBRARY
  // =====================================================

  const removeFromLibrary = async (itemId) => {
    try {
      await deleteLibraryItem(itemId);

      setSelectedMovie(null);
    } catch (error) {
      console.error("Error removing library item:", error);
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (libraryLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={32}
            className="animate-spin text-[#d4af37]"
          />

          <p className="text-sm text-gray-500">
            Loading your library...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-white/10 px-6 py-5 md:px-10">
        <Link
          to="/home"
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#d4af37]/40
            bg-[#d4af37]/10
            px-3
            py-2
            text-sm
            font-medium
            text-[#f2ca50]
            transition-all
            duration-200
            hover:border-[#d4af37]
            hover:bg-[#d4af37]
            hover:text-black
            hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]
          "
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main
        className="
          mx-auto
          max-w-[1600px]
          px-6
          py-10
          md:px-10
        "
      >

        {/* Page Header */}

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <LibraryIcon
              size={30}
              className="text-[#d4af37]"
            />

            <h1 className="text-3xl font-bold md:text-4xl">
              My Library
            </h1>
          </div>

          <p className="mt-2 text-gray-500">
            Keep track of everything you're watching and
            planning.
          </p>

          {/* Total count */}

          <p className="mt-3 text-sm text-gray-600">
            {library.length}{" "}
            {library.length === 1 ? "item" : "items"} in
            your library
          </p>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {libraryError && (
          <div
            className="
              mb-8
              rounded-lg
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              text-sm
              text-red-400
            "
          >
            {libraryError}
          </div>
        )}

        {/* =================================================
            EMPTY LIBRARY
        ================================================= */}

        {!libraryError && library.length === 0 && (
          <div
            className="
              flex
              min-h-[400px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              text-center
            "
          >
            <LibraryIcon
              size={50}
              className="mb-5 text-gray-700"
            />

            <h2 className="text-xl font-semibold">
              Your library is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Movies and shows you add to your library will
              appear here.
            </p>

            <Link
              to="/home"
              className="
                mt-6
                rounded-lg
                bg-[#d4af37]
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[#e4c65a]
              "
            >
              Browse Movies
            </Link>
          </div>
        )}

        {/* =================================================
            CONTINUE WATCHING
        ================================================= */}

        {continueWatching.length > 0 && (
          <LibrarySection
            title="Continue Watching"
            movies={continueWatching}
            onMovieClick={setSelectedMovie}
          />
        )}

        {/* =================================================
            FUTURE PLANS
        ================================================= */}

        {futurePlans.length > 0 && (
          <LibrarySection
            title="Future Plans"
            movies={futurePlans}
            onMovieClick={setSelectedMovie}
          />
        )}

        {/* =================================================
            COMPLETED
        ================================================= */}

        {completed.length > 0 && (
          <LibrarySection
            title="Completed"
            movies={completed}
            onMovieClick={setSelectedMovie}
          />
        )}

      </main>

      {/* =================================================
          MOVIE MODAL
      ================================================= */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};

// =========================================================
// LIBRARY SECTION
// =========================================================

const LibrarySection = ({
  title,
  movies,
  onMovieClick,
}) => {
  return (
    <section className="mb-12">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <span className="text-sm text-gray-600">
          {movies.length}
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          md:grid-cols-4
          md:gap-5
          lg:grid-cols-5
          xl:grid-cols-6
          2xl:grid-cols-7
        "
      >
        {movies.map((movie) => (
          <Moviecard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>

    </section>
  );
};

export default Library;