import React from "react";

const MovieModal = ({ movie, onClose }) => {

  if (!movie) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-md
      "
      onClick={onClose}
    >

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-2xl
          bg-[#121212]
          border
          border-white/10
          shadow-2xl
        "
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-10
            w-9
            h-9
            rounded-full
            bg-black/60
            text-white
            text-xl
            hover:bg-white/20
            transition
          "
        >
          ×
        </button>


        <div className="grid md:grid-cols-[280px_1fr]">

          {/* ================= POSTER ================= */}

          <div className="h-[400px] md:h-[500px]">

            <img
              src={movie.poster}
              alt={movie.name}
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>


          {/* ================= DETAILS ================= */}

          <div className="p-6 md:p-8 text-white">

            {/* Name */}

            <h1 className="
              text-3xl
              md:text-4xl
              font-bold
            ">
              {movie.name}
            </h1>


            {/* Category */}

            <div className="
              flex
              items-center
              gap-2
              mt-4
            ">

              <span className="
                px-3
                py-1
                rounded-full
                bg-[#d4af37]/15
                text-[#d4af37]
                text-sm
              ">
                {movie.type}
              </span>

            </div>


            {/* Rating */}

            <div className="
              flex
              items-center
              gap-2
              mt-6
            ">

              <span className="
                text-[#d4af37]
                text-xl
              ">
                ★
              </span>

              <span className="
                text-lg
                font-semibold
              ">
                {movie.rating}
              </span>

              <span className="text-gray-500">
                / 10
              </span>

            </div>


            {/* Information */}

            <div className="
              grid
              grid-cols-2
              gap-4
              mt-6
              py-5
              border-y
              border-white/10
            ">

              <div>

                <p className="text-gray-500 text-sm">
                  Runtime
                </p>

                <p className="mt-1">
                  {movie.runtime}
                </p>

              </div>


              <div>

                <p className="text-gray-500 text-sm">
                  Available At
                </p>

                <p className="mt-1">
                  {movie.availableAt}
                </p>

              </div>

            </div>


            {/* Description */}

            <p className="
              mt-6
              text-gray-400
              leading-relaxed
            ">
              {movie.description}
            </p>


            {/* Watchlist */}

            <button
              className="
                mt-8
                w-full
                py-3
                rounded-lg
                bg-[#d4af37]
                text-black
                font-semibold
                hover:bg-[#e4c65a]
                transition
              "
            >
              + Add to Watchlist
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MovieModal;