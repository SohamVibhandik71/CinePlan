import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

import { dummyMovies } from "../assets/assets";
import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

const Browse = () => {
  const categories = ["Anime", "Movies", "Series"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = dummyMovies
    .filter((movie) => {
      if (!selectedCategory) return true;
      return movie.type === selectedCategory;
    })
    .filter((movie) => {
      if (!search.trim()) return true;

      return movie.name
        .toLowerCase()
        .includes(search.toLowerCase());
    });

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* ================= HEADER ================= */}

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

      {/* ================= CONTROLS ================= */}

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

        {/* Categories */}

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

        {/* Search */}

        <div className="relative w-full md:w-64">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

      {/* ================= MOVIES ================= */}

      <main className="mx-auto max-w-[1600px] px-6 py-8 md:px-10">

        {filteredMovies.length > 0 ? (
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
            {filteredMovies.map((movie) => (
              <Moviecard
                key={movie.id}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-gray-500">
              No movies found.
            </p>
          </div>
        )}

      </main>

      {/* ================= MOVIE MODAL ================= */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};

export default Browse;