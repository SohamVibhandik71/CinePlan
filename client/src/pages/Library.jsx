import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { dummyMovies } from "../assets/assets";
import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

const Library = () => {

  const [selectedMovie, setSelectedMovie] = useState(null);

  // ================= LIBRARY DATA =================

  const continueWatching = [
    dummyMovies[0],
    dummyMovies[1],
    dummyMovies[2],
  ];

  const futurePlans = [
    dummyMovies[3],
    dummyMovies[4],
    dummyMovies[5],
  ];

  const completed = [
    dummyMovies[4],
    dummyMovies[2],
    dummyMovies[3],
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* ================= HEADER ================= */}

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

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <h1 className="text-3xl md:text-4xl font-bold">
            My Library
          </h1>

          <p className="text-gray-500 mt-2">
            Keep track of everything you're watching and planning.
          </p>

        </div>


        {/* ================= CONTINUE WATCHING ================= */}

        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Continue Watching
          </h2>

          {continueWatching.length > 0 ? (

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

              {continueWatching.map((movie) => (

                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              Nothing here yet.
            </p>

          )}

        </section>


        {/* ================= FUTURE PLANS ================= */}

        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Future Plans
          </h2>

          {futurePlans.length > 0 ? (

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

              {futurePlans.map((movie) => (

                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No future plans yet.
            </p>

          )}

        </section>


        {/* ================= COMPLETED ================= */}

        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Completed
          </h2>

          {completed.length > 0 ? (

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

              {completed.map((movie) => (

                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No completed content yet.
            </p>

          )}

        </section>

      </main>


      {/* ================= MOVIE MODAL ================= */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};

export default Library;