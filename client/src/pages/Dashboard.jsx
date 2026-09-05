import React, { useState } from "react";
import { dummyMovies } from "../assets/assets";
import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

const Dashboard = () => {

  // Movie currently selected for popup
  const [selectedMovie, setSelectedMovie] = useState(null);


  // ================= DASHBOARD DATA =================

  // Continue watching
  const continueWatching = [
    dummyMovies[0],
    dummyMovies[1],
    dummyMovies[2],
  ];


  // Today's plan
  const todaysPlan = [
    dummyMovies[3],
    dummyMovies[4],
  ];


  // Statistics
  const stats = {
    completedMovies: 12,
    completedSeries: 7,
    completedAnime: 9,
    futureContent: 18,
    totalHours: 86,
  };


  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20">

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

        {/* ================= WELCOME ================= */}

        <div className="mb-10">

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
            "
          >
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            Continue your journey through the world of cinema.
          </p>

        </div>


        {/* ================= CONTINUE WATCHING ================= */}

        <section className="mb-12">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold">
              Continue Watching
            </h2>

          </div>


          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
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

        </section>


        {/* ================= TODAY'S PLAN ================= */}

        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Today's Plan
          </h2>


          {todaysPlan.length > 0 ? (

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                gap-4
                md:gap-5
              "
            >

              {todaysPlan.map((movie) => (

                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          ) : (

            <div
              className="
                py-16
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.02]
              "
            >

              <p className="text-gray-500">
                Nothing to watch today
              </p>

            </div>

          )}

        </section>


        {/* ================= STATS ================= */}

        <section>

          <h2 className="text-2xl font-bold mb-5">
            Your Stats
          </h2>


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
            "
          >

            {/* Completed Movies */}

            <div
              className="
                p-6
                rounded-xl
                bg-white/[0.03]
                border
                border-white/10
              "
            >

              <p className="text-gray-500 text-sm">
                Completed Movies
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-[#d4af37]
                "
              >
                {stats.completedMovies}
              </p>

            </div>


            {/* Completed Series */}

            <div
              className="
                p-6
                rounded-xl
                bg-white/[0.03]
                border
                border-white/10
              "
            >

              <p className="text-gray-500 text-sm">
                Completed Series
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-[#d4af37]
                "
              >
                {stats.completedSeries}
              </p>

            </div>


            {/* Completed Anime */}

            <div
              className="
                p-6
                rounded-xl
                bg-white/[0.03]
                border
                border-white/10
              "
            >

              <p className="text-gray-500 text-sm">
                Completed Anime
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-[#d4af37]
                "
              >
                {stats.completedAnime}
              </p>

            </div>


            {/* Future Content */}

            <div
              className="
                p-6
                rounded-xl
                bg-white/[0.03]
                border
                border-white/10
              "
            >

              <p className="text-gray-500 text-sm">
                Future Content
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-[#d4af37]
                "
              >
                {stats.futureContent}
              </p>

            </div>


            {/* Total Time */}

            <div
              className="
                p-6
                rounded-xl
                bg-white/[0.03]
                border
                border-white/10
                sm:col-span-2
                lg:col-span-4
              "
            >

              <p className="text-gray-500 text-sm">
                Total Time Watched
              </p>

              <div className="flex items-end gap-2 mt-2">

                <p
                  className="
                    text-4xl
                    font-bold
                    text-[#d4af37]
                  "
                >
                  {stats.totalHours}
                </p>

                <p className="text-gray-400 mb-1">
                  hours
                </p>

              </div>

            </div>

          </div>

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

export default Dashboard;