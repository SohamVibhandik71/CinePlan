import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import axios from "axios";

import Moviecard from "../components/Moviecard";
import MovieModal from "../components/MovieModel";
import { useContent } from "../context/ContentContext";

const Recommendation = () => {
  const {
    recommendations,
    recommendationsLoading,
    recommendationsError,
    fetchRecommendations,
  } = useContent();

  const [recommendationDetails, setRecommendationDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log("Recommendations:", recommendations);
  console.log("First recommendation:", recommendations[0]);

  // ================= FETCH RECOMMENDATIONS =================

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // ================= FETCH TMDB DETAILS =================

  useEffect(() => {
    if (recommendations.length === 0) {
      return;
    }

    const fetchRecommendationDetails = async () => {
      try {
        setDetailsLoading(true);

        const details = await Promise.all(
          recommendations.map(async (recommendation) => {
            const endpoint =
              recommendation.type === "movie"
                ? `/api/content/movie/${recommendation.content_id}`
                : `/api/content/tv/${recommendation.content_id}`;

            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}${endpoint}`
            );

            return {
              ...response.data.data,

              // Keep ML information
              recommendationScore: recommendation.final_score,
              recommendationGenres: recommendation.genres,
            };
          })
        );

        console.log("TMDB recommendation details:", details);

        setRecommendationDetails(details);

      } catch (error) {
        console.error(
          "Error fetching recommendation details:",
          error
        );
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchRecommendationDetails();

  }, [recommendations]);


  // ================= FILTER RESULTS =================

  const recommendedMovies = recommendationDetails.filter(
    (item) => item.type === "movie"
  );

  const recommendedSeries = recommendationDetails.filter(
    (item) => item.type === "tv"
  );


  // ================= RETURN =================

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

        <div className="mt-6">

          <div className="flex items-center gap-3">

            <Sparkles
              size={28}
              className="text-[#d4af37]"
            />

            <h1 className="text-3xl font-bold md:text-4xl">
              Recommendations
            </h1>

          </div>

          <p className="mt-2 text-gray-500">
            Movies and shows picked for you based on your watch history.
          </p>

        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <main className="mx-auto max-w-[1600px] px-6 py-8 md:px-10">

        {/* Loading */}

        {(recommendationsLoading || detailsLoading) && (

          <div className="flex min-h-[500px] items-center justify-center">

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


        {/* Error */}

        {!recommendationsLoading &&
          !detailsLoading &&
          recommendationsError && (

            <div className="flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <Sparkles
                  size={32}
                  className="mx-auto text-red-400"
                />

                <p className="mt-4 text-sm text-red-400">
                  {recommendationsError}
                </p>

              </div>

            </div>

          )}


        {/* Results */}

        {!recommendationsLoading &&
          !detailsLoading &&
          !recommendationsError &&
          recommendationDetails.length > 0 && (

            <div>

              {/* ================= MOVIES ================= */}

              <RecommendationSection
                title="Recommended Movies"
                items={recommendedMovies}
                onSelect={setSelectedMovie}
              />


              {/* ================= SERIES ================= */}

              <RecommendationSection
                title="Recommended Series"
                items={recommendedSeries}
                onSelect={setSelectedMovie}
              />

            </div>

          )}


        {/* No recommendations */}

        {!recommendationsLoading &&
          !detailsLoading &&
          !recommendationsError &&
          recommendations.length === 0 && (

            <div className="flex min-h-[400px] items-center justify-center">

              <div className="text-center">

                <Sparkles
                  size={40}
                  className="mx-auto text-gray-600"
                />

                <h2 className="mt-5 text-xl font-semibold text-gray-400">
                  No recommendations yet
                </h2>

                <p className="mt-2 max-w-md text-sm text-gray-600">
                  Add some movies or shows to your library and start
                  watching them to get personalized recommendations.
                </p>

              </div>

            </div>

          )}

      </main>


      {/* ================= MODAL ================= */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
};


/* ================================================= */
/* RECOMMENDATION SECTION */
/* ================================================= */

const RecommendationSection = ({
  title,
  items,
  onSelect,
}) => {

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-[#e5e2e1]">
          {title}
        </h2>

      </div>

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

        {items.map((movie) => (

          <Moviecard
            key={movie.id}
            movie={movie}
            onClick={() => onSelect(movie)}
          />

        ))}

      </div>

    </section>
  );
};

export default Recommendation;