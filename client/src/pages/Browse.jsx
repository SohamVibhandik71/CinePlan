import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";
import { useContent } from "../context/ContentContext";

const Browse = () => {
  const categories = ["Anime", "Movies", "Series"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    searchResults,
    searchLoading,
    searchError,
    searchContent,
  } = useContent();

  // ================= SEARCH =================

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return;

    const query = search.trim();

    if (!query) return;

    setHasSearched(true);

    await searchContent(query);
  };

  // ================= FILTER =================

  const filteredResults = searchResults.filter((movie) => {

    // No category selected
    // Show everything
    if (!selectedCategory) {
      return true;
    }

    // Movies
    if (selectedCategory === "Movies") {
      return movie.type === "movie";
    }

    // Series
    if (selectedCategory === "Series") {
      return movie.type === "tv";
    }

    // Anime
    // Current backend search response does not provide
    // enough information to reliably identify anime.
    if (selectedCategory === "Anime") {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-white/10 px-6 py-5 md:px-10">

        {/* Back to Home */}

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

        {/* Title */}

        <div className="mt-6">

          <h1 className="text-3xl font-bold md:text-4xl">
            Browse
          </h1>

          <p className="mt-2 text-gray-500">
            Discover something worth watching
          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* CONTROLS */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-white/10
          px-6
          py-4
          md:flex-row
          md:items-center
          md:justify-between
          md:px-10
        "
      >

        {/* ================= CATEGORIES ================= */}

        <div className="flex items-center gap-2 overflow-x-auto">

          {categories.map((category) => {

            const active = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(active ? "" : category)
                }
                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    active
                      ? "bg-[#d4af37] text-black"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {category}
              </button>
            );

          })}

        </div>


        {/* ================= SEARCH ================= */}

        <div className="relative w-full md:w-64">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="
              h-10
              w-full
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              pr-10
              text-sm
              text-white
              outline-none
              placeholder:text-gray-500
              focus:border-[#d4af37]/60
            "
          />

          <Search
            size={17}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

        </div>

      </div>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="mx-auto max-w-[1600px] px-6 py-8 md:px-10">


        {/* ================================================= */}
        {/* INITIAL SEARCH SCREEN */}
        {/* ================================================= */}

        {!hasSearched && (

          <div
            className="
              flex
              min-h-[500px]
              flex-col
              items-center
              justify-center
            "
          >

            {/* Animated Search */}

            <div
              className="
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
              "
            >

              {/* Rotating Outer Ring */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-[#d4af37]/20
                  border-t-[#d4af37]
                  animate-spin
                "
              />

              {/* Second Ring */}

              <div
                className="
                  absolute
                  inset-3
                  rounded-full
                  border
                  border-[#d4af37]/10
                  border-b-[#d4af37]/60
                  animate-[spin_3s_linear_infinite_reverse]
                "
              />

              {/* Glow */}

              <div
                className="
                  absolute
                  h-20
                  w-20
                  rounded-full
                  bg-[#d4af37]/10
                  animate-pulse
                "
              />

              {/* Moving Search Icon */}

              <Search
                size={42}
                strokeWidth={1.5}
                className="
                  relative
                  z-10
                  text-[#d4af37]
                  animate-[searchMove_2s_ease-in-out_infinite]
                "
              />

            </div>


            {/* Text */}

            <h2 className="mt-7 text-xl font-semibold text-gray-300">
              Search for something to watch
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Search movies, series and more.
            </p>

          </div>

        )}


        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {hasSearched && searchLoading && (

          <div
            className="
              flex
              min-h-[500px]
              items-center
              justify-center
            "
          >

            <div
              className="
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-white/10
                border-t-[#d4af37]
              "
            />

          </div>

        )}


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {hasSearched &&
          !searchLoading &&
          searchError && (

            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <Search
                  size={32}
                  className="mx-auto text-red-400"
                />

                <p className="mt-4 text-sm text-red-400">
                  {searchError}
                </p>

              </div>

            </div>

          )}


        {/* ================================================= */}
        {/* NO RESULTS */}
        {/* ================================================= */}

        {hasSearched &&
          !searchLoading &&
          !searchError &&
          filteredResults.length === 0 && (

            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <Search
                  size={32}
                  className="mx-auto text-gray-600"
                />

                <p className="mt-4 text-gray-500">
                  No results found.
                </p>

              </div>

            </div>

          )}


        {/* ================================================= */}
        {/* SEARCH RESULTS */}
        {/* ================================================= */}

        {hasSearched &&
          !searchLoading &&
          !searchError &&
          filteredResults.length > 0 && (

            <div
              className="
                grid
                grid-cols-2
                gap-4
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                2xl:grid-cols-7
                md:gap-5
              "
            >

              {filteredResults.map((movie) => (

                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          )}

      </main>


      {/* ================================================= */}
      {/* MOVIE MODAL */}
      {/* ================================================= */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};

export default Browse;


/* ================================================= */
/* SEARCH ICON ANIMATION */
/* ================================================= */
