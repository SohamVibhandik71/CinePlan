import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MovieCard from '../components/Moviecard.jsx'
import MovieModal from '../components/MovieModel.jsx'

const trendingMovies = [
  {
    id: 1,
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 8.7,
    year: 2014,
    type: 'Movie',
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    rating: 8.8,
    year: 2010,
    type: 'Movie',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    year: 2008,
    type: 'Movie',
  },
  {
    id: 4,
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    rating: 8.6,
    year: 2024,
    type: 'Movie',
  },
  {
    id: 5,
    title: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    rating: 8.6,
    year: 2023,
    type: 'Movie',
  },
]

const trendingTV = [
  {
    id: 101,
    title: 'Breaking Bad',
    poster: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC2S8Tg3e8e1mQXfKX2.jpg',
    rating: 9.5,
    year: 2008,
    type: 'TV',
  },
  {
    id: 102,
    title: 'Stranger Things',
    poster: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    rating: 8.6,
    year: 2016,
    type: 'TV',
  },
  {
    id: 103,
    title: 'The Last of Us',
    poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    rating: 8.6,
    year: 2023,
    type: 'TV',
  },
  {
    id: 104,
    title: 'The Boys',
    poster: 'https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg',
    rating: 8.5,
    year: 2019,
    type: 'TV',
  },
  {
    id: 105,
    title: 'Wednesday',
    poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    rating: 8.5,
    year: 2022,
    type: 'TV',
  },
]

const trendingAnime = [
  {
    id: 201,
    title: 'Demon Slayer',
    poster: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBVYj.jpg',
    rating: 8.7,
    year: 2019,
    type: 'Anime',
  },
  {
    id: 202,
    title: 'Jujutsu Kaisen',
    poster: 'https://image.tmdb.org/t/p/w500/hFWP5HkbVEeWRoE0qqLwZ2K3x8I.jpg',
    rating: 8.6,
    year: 2020,
    type: 'Anime',
  },
  {
    id: 203,
    title: 'One Piece',
    poster: 'https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
    rating: 8.7,
    year: 1999,
    type: 'Anime',
  },
  {
    id: 204,
    title: 'Attack on Titan',
    poster: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    rating: 9.0,
    year: 2013,
    type: 'Anime',
  },
  {
    id: 205,
    title: 'My Hero Academia',
    poster: 'https://image.tmdb.org/t/p/w500/phM9bb6s9cKB6q5b8h7v7s5K6VQ.jpg',
    rating: 8.3,
    year: 2016,
    type: 'Anime',
  },
]

const trendingSeries = [
  {
    id: 301,
    title: 'Dark',
    poster: 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
    rating: 8.4,
    year: 2017,
    type: 'Series',
  },
  {
    id: 302,
    title: 'Peaky Blinders',
    poster: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
    rating: 8.5,
    year: 2013,
    type: 'Series',
  },
  {
    id: 303,
    title: 'Sherlock',
    poster: 'https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9Hl.jpg',
    rating: 8.5,
    year: 2010,
    type: 'Series',
  },
  {
    id: 304,
    title: 'House of the Dragon',
    poster: 'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
    rating: 8.4,
    year: 2022,
    type: 'Series',
  },
  {
    id: 305,
    title: 'The Witcher',
    poster: 'https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiOQGDn9f3f9R7A.jpg',
    rating: 8.0,
    year: 2019,
    type: 'Series',
  },
]

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null)

  const sections = [
    {
      title: 'Trending Movies',
      movies: trendingMovies,
    },
    {
      title: 'Trending TV Shows',
      movies: trendingTV,
    },
    {
      title: 'Trending Anime',
      movies: trendingAnime,
    },
    {
      title: 'Trending Series',
      movies: trendingSeries,
    },
  ]

  return (
    <div className="min-h-screen bg-[#131313]">

      <Sidebar />

    <div className="ml-72 min-h-screen border-l border-white/10">

      

    <main className="px-10 py-8">

          {/* Welcome section */}
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

          {/* Content sections */}
          {sections.map((section) => (
            <section
              key={section.title}
              className="mb-12"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#e5e2e1]">
                  {section.title}
                </h2>

                <button className="text-sm text-[#d4af37] transition-colors hover:text-[#f2ca50]">
                  See all
                </button>
              </div>

              <div className="flex gap-5 overflow-x-auto pb-3">
                {section.movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovie(movie)}
                  />
                ))}
              </div>
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
  )
}

export default Home