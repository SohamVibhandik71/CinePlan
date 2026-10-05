import React from "react";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const {
    name,
    title,
    type,
    poster,
    rating,
    overview,
    releaseDate,
    popularity,
    description,
  } = movie;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80 backdrop-blur-sm
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full max-w-5xl
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          bg-[#111111]
          border border-white/10
          shadow-2xl
          text-white
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute top-4 right-4 z-20
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-black/70
            text-2xl text-white
            backdrop-blur-sm
            transition
            hover:bg-white/20
          "
        >
          ×
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-[320px_1fr]">
          {/* ================= POSTER ================= */}
          <div className="relative h-[420px] md:h-full md:min-h-[560px]">
            <img
              src={poster}
              alt={name}
              className="h-full w-full object-cover"
            />

            {/* Poster Gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/60
                via-transparent
                to-transparent
                md:bg-gradient-to-r
              "
            />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex flex-col p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="pr-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#d4af37]">
                {type}
              </p>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                {name}
              </h1>

              {title && (
                <p className="mt-2 text-lg text-gray-400">
                  {title}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl text-[#d4af37]">★</span>

              <span className="text-xl font-semibold">
                {rating}
              </span>

              <span className="text-sm text-gray-500">
                / 10
              </span>
            </div>

            {/* Movie Information */}
            <div
              className="
                mt-7
                grid grid-cols-2 gap-y-5
                border-y border-white/10
                py-6
              "
            >
              <InfoItem
                label="Release Date"
                value={releaseDate}
              />

              <InfoItem
                label="Popularity"
                value={popularity}
              />

              <InfoItem
                label="Type"
                value={type}
              />

              <InfoItem
                label="Rating"
                value={`${rating}/10`}
              />
            </div>

            {/* Overview */}
            {overview && (
              <section className="mt-7">
                <h2 className="mb-2 text-lg font-semibold">
                  Overview
                </h2>

                <p className="text-sm leading-7 text-gray-400">
                  {overview}
                </p>
              </section>
            )}

            {/* Description */}
            {description && (
              <section className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">
                  Description
                </h2>

                <p className="text-sm leading-7 text-gray-400">
                  {description}
                </p>
              </section>
            )}

            {/* Watchlist */}
            <button
              className="
                mt-8
                w-full
                rounded-xl
                bg-[#d4af37]
                px-6 py-3.5
                font-semibold
                text-black
                transition
                hover:bg-[#e4c65a]
                active:scale-[0.98]
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

/* ================= INFO ITEM ================= */

const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-200">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default MovieModal;

