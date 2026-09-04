import React, { useState } from "react";
import { dummyMovies } from "../assets/assets";
import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

const Library = () => {

  // Movie selected for popup
  const [selectedMovie, setSelectedMovie] = useState(null);


  // ================= LIBRARY DATA =================

  // Continue Watching
  const continueWatching = [
    dummyMovies[0],
    dummyMovies[1],
    dummyMovies[2],
  ];


  // Future Plans
  const futurePlans = [
    dummyMovies[3],
    dummyMovies[4],
    dummyMovies[5],
  ];


  // Completed
  const completed = [
    dummyMovies[4],
    dummyMovies[2],
    dummyMovies[3],
  ];


  return (
    <div className="min-h-screen bg-[#080808] text-white">


      {/* ================= NAVBAR ================= */}

      <nav
        className="
          sticky
          top-0
          z-40
          h-20
          px-6
          md:px-10
          flex
          items-center
          justify-between
          bg-[#080808]/90
          backdrop-blur-xl
          border-b
          border-white/10
        "
      >

        {/* Logo */}

        <div
          className="
            text-2xl
            font-bold
            shrink-0
          "
        >
          Cine<span className="text-[#d4af37]">Plan</span>
        </div>


        {/* Profile */}

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="
              w-10
              h-10
              rounded-full
              object-cover
              border
              border-white/10
            "
          />

          <div className="hidden sm:block">

            <p className="text-sm font-semibold">
              Uddhav
            </p>

            <p className="text-xs text-gray-500">
              CinePlan User
            </p>

          </div>

        </div>

      </nav>


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

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
            "
          >
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