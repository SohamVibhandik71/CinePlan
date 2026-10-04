import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MovieCard from "../components/Moviecard.jsx";
import MovieModal from "../components/MovieModel.jsx";
import { useContent } from "../context/ContentContext";

const Home = () => {
  const {
    movies,
    moviesLoading,
    moviesError,
    fetchMovies,

    tvShows,
    tvLoading,
    tvError,
    fetchTVShows,

    anime,
    animeLoading,
    animeError,
    fetchAnime,

    series,
    seriesLoading,
    seriesError,
    fetchSeries,
  } = useContent();

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchTVShows();
    fetchAnime();
  }, []);

  const sections = [
    {
      title: "Trending Movies",
      movies: movies,
      loading: moviesLoading,
      error: moviesError,
    },
    {
      title: "Trending TV Shows",
      movies: tvShows,
      loading: tvLoading,
      error: tvError,
    },
    {
      title: "Trending Anime",
      movies: anime,
      loading: animeLoading,
      error: animeError,
    },
    
  ];

  return (
    <div className="min-h-screen bg-[#131313]">

      <Sidebar />

      <div className="ml-72 min-h-screen border-l border-white/10">

        <main className="px-10 py-8">

          {/* Welcome Section */}
          <section className="mb-10">
            <p className="text-[0.68rem] font-bold tracking-[0.2em] text-[#d4af37]">
              DISCOVER
            </p>

            <h1 className="mt-3 text-4xl font-semibold text-[#e5e2e1]">
              What are you watching?
            </h1>

            <p className="mt-2 text-[0.95rem] text-[#99907c]">
              Discover what's trending right now.
            </p>
          </section>

          {/* Content Sections */}
          {sections.map((section) => (
            <section
              key={section.title}
              className="mb-12"
            >

              {/* Section Header */}
              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-semibold text-[#e5e2e1]">
                  {section.title}
                </h2>

                <button className="text-sm text-[#d4af37] transition-colors hover:text-[#f2ca50]">
                  See all
                </button>

              </div>

              {/* Loading */}
              {section.loading ? (
                <div className="flex h-[360px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-[#d4af37]" />
                </div>

              ) : section.error ? (

                /* Error */
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
                  Failed to load {section.title}.
                </div>

              ) : !section.movies || section.movies.length === 0 ? (

                /* No Data */
                <div className="flex h-[360px] items-center justify-center text-sm text-gray-500">
                  No content available.
                </div>

              ) : (

                /* Content */
                <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">

                  {section.movies?.map((movie) => (
                    <div
                      key={movie.id}
                      className="w-[240px] flex-none"
                    >
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </div>
                  ))}

                </div>
              )}

            </section>
          ))}

        </main>

      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  );
};

export default Home;