import React, { useState } from 'react'
import { dummyMovies } from '../assets/assets';
import Moviecard from '../components/Moviecard';
import MovieModal from '../components/MovieModel';

const Browse = () => {

  const category = [
    "Anime",
    "Movies",
    "Series",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (

    <div className="min-h-screen bg-[#080808] text-white pt-20">

      {/* ================= BROWSE CONTROLS ================= */}

      <div
        className="
          h-20
          px-6
          md:px-10
          flex
          items-center
          justify-between
          gap-6
          bg-[#080808]
          border-b
          border-white/10
        "
      >

        {/* Categories */}

        <div
          className="
            hidden
            md:flex
            items-center
            justify-center
            gap-2
            flex-1
          "
        >

          {category.map((item) => (
            <button
              key={item}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === item ? "" : item
                )
              }
              className={`
                px-5
                py-2
                rounded-full
                text-sm
                font-medium
                transition
                ${
                  selectedCategory === item
                    ? "bg-[#d4af37] text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>


        {/* Search */}

        <div
          className="
            relative
            w-full
            sm:w-56
            md:w-72
            shrink-0
            ml-auto
          "
        >

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-10
              px-4
              pr-10
              rounded-full
              bg-white/5
              border
              border-white/10
              outline-none
              text-sm
              text-white
              placeholder:text-gray-500
              focus:border-[#d4af37]/60
            "
          />

          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          >
            🔍
          </span>

        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <main
        className="
          max-w-[1600px]
          mx-auto
          px-6
          md:px-10
          py-10
        "
      >

        {/* Heading */}

        <div className="mb-8">

          <h1 className="
            text-3xl
            md:text-4xl
            font-bold
          ">
            Browse {selectedCategory}
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Discover something worth watching
          </p>

        </div>


        {/* ================= CARDS ================= */}

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-7
            gap-4
            md:gap-5
          "
        >

          {dummyMovies

            .filter((movie) => {
              if (!selectedCategory) {
                return true;
              }

              return movie.type === selectedCategory;
            })

            .filter((movie) => {
              if (!search.trim()) {
                return true;
              }

              return movie.name
                .toLowerCase()
                .includes(search.toLowerCase());
            })

            .map((movie) => (
              <Moviecard
                key={movie.id}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}

        </div>


        {/* ================= MOVIE MODAL ================= */}

        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />

      </main>

    </div>
  )
}

export default Browse