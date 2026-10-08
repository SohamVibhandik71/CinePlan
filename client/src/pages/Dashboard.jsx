import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";

import { useLibrary } from "../context/LibraryContext";

const Dashboard = () => {
  const {
    library,
    libraryLoading,
    libraryError,
  } = useLibrary();

  const [selectedMovie, setSelectedMovie] = useState(null);

  // =====================================================
  // CONTINUE WATCHING
  // Only watching items are displayed as cards
  // =====================================================

  const continueWatching = library.filter(
    (item) => item.status === "watching"
  );

  // =====================================================
  // STATS
  // These are calculated from the user's library
  // =====================================================

  const completedContent = library.filter(
    (item) => item.status === "completed"
  );

  const plannedContent = library.filter(
    (item) => item.status === "planned"
  );

  const completedMovies = completedContent.filter(
    (item) => item.type === "movie"
  ).length;

  const completedSeries = completedContent.filter(
    (item) => item.type === "tv"
  ).length;

  const completedAnime = completedContent.filter(
    (item) => item.type === "anime"
  ).length;

  const futureContent = plannedContent.length;

  // Watch-time tracking will be implemented later.
  const totalHours = 0;

  // =====================================================
  // LOADING
  // =====================================================

  if (libraryLoading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">

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

        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-gray-500">
            Loading your dashboard...
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main
        className="
          mx-auto
          max-w-[1600px]
          px-6
          py-10
          md:px-10
        "
      >

        {/* =====================================================
            WELCOME
        ===================================================== */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold md:text-4xl">
            Welcome back
          </h1>

          <p className="mt-2 text-gray-500">
            Continue your journey through the world of cinema.
          </p>

        </div>


        {/* =====================================================
            ERROR
        ===================================================== */}

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


        {/* =====================================================
            CONTINUE WATCHING
        ===================================================== */}

        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Continue Watching
            </h2>

            <span className="text-sm text-gray-600">
              {continueWatching.length}
            </span>

          </div>

          {continueWatching.length > 0 ? (

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
              "
            >

              {continueWatching.map((movie) => (

                <Moviecard
                  key={movie._id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />

              ))}

            </div>

          ) : (

            <div
              className="
                flex
                min-h-[220px]
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.02]
              "
            >

              <p className="text-gray-500">
                You aren't watching anything right now.
              </p>

            </div>

          )}

        </section>


        {/* =====================================================
            TODAY'S PLAN
        ===================================================== */}

        <section className="mb-12">

          <h2 className="mb-5 text-2xl font-bold">
            Today's Plan
          </h2>

          <div
            className="
              relative
              min-h-[260px]
              overflow-hidden
              rounded-2xl
              border
              border-[#d4af37]/20
              bg-gradient-to-br
              from-[#d4af37]/[0.08]
              via-white/[0.02]
              to-transparent
            "
          >

            {/* Background glow */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-40
                w-40
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#d4af37]/10
                blur-3xl
                animate-pulse
              "
            />

            {/* Floating emojis */}

            <div
              className="
                absolute
                left-[15%]
                top-10
                text-2xl
                opacity-40
                animate-bounce
              "
            >
              🎬
            </div>

            <div
              className="
                absolute
                right-[18%]
                top-14
                text-xl
                opacity-40
                animate-pulse
              "
            >
              ✨
            </div>

            <div
              className="
                absolute
                bottom-10
                left-[25%]
                text-xl
                opacity-30
                animate-pulse
              "
            >
              🍿
            </div>

            <div
              className="
                absolute
                bottom-8
                right-[25%]
                text-2xl
                opacity-30
                animate-bounce
              "
            >
              🎥
            </div>


            {/* Main content */}

            <div
              className="
                relative
                flex
                min-h-[260px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              {/* Main emoji */}

              <div className="mb-4 text-5xl animate-bounce">
                🎬
              </div>


              {/* Status */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#d4af37]/30
                  bg-[#d4af37]/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[#f2ca50]
                "
              >

                <span className="animate-pulse">
                  🔴
                </span>

                <span>
                  LIVE FEATURE IN DEVELOPMENT
                </span>

              </div>


              {/* Title */}

              <h3
                className="
                  text-xl
                  font-semibold
                  text-white
                  md:text-2xl
                "
              >
                Your Daily Watch Plan is Coming! ✨
              </h3>


              {/* Description */}

              <p
                className="
                  mt-3
                  max-w-lg
                  text-sm
                  leading-relaxed
                  text-gray-500
                "
              >
                We're cooking up something special 🍿
                <br />
                Soon CinePlan will create a personalized
                watch plan just for you.
              </p>


              {/* Animated dots */}

              <div className="mt-5 flex items-center gap-1">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d4af37]
                    animate-pulse
                  "
                />

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d4af37]
                    animate-pulse
                    [animation-delay:200ms]
                  "
                />

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d4af37]
                    animate-pulse
                    [animation-delay:400ms]
                  "
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section>

          <h2 className="mb-5 text-2xl font-bold">
            Your Stats
          </h2>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {/* Completed Movies */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <p className="text-sm text-gray-500">
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
                {completedMovies}
              </p>

            </div>


            {/* Completed Series */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <p className="text-sm text-gray-500">
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
                {completedSeries}
              </p>

            </div>


            {/* Completed Anime */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <p className="text-sm text-gray-500">
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
                {completedAnime}
              </p>

            </div>


            {/* Future Content */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <p className="text-sm text-gray-500">
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
                {futureContent}
              </p>

            </div>


            {/* Total Time */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
                sm:col-span-2
                lg:col-span-4
              "
            >

              <p className="text-sm text-gray-500">
                Total Time Watched
              </p>

              <div className="mt-2 flex items-end gap-2">

                <p
                  className="
                    text-4xl
                    font-bold
                    text-[#d4af37]
                  "
                >
                  {totalHours}
                </p>

                <p className="mb-1 text-gray-400">
                  hours
                </p>

              </div>

              <p className="mt-2 text-xs text-gray-600">
                Watch-time tracking will be available in a
                future update. ⏱️
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          MOVIE MODAL
      ===================================================== */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};

export default Dashboard;