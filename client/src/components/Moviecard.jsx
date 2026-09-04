import React from "react";

const Moviecard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        w-full
        aspect-[2/3]
        overflow-hidden
        rounded-xl
        bg-zinc-900
        border
        border-white/10
        cursor-pointer
        transition-all
        duration-300
        hover:scale-105
      "
    >

      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.name}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />


      {/* Bottom Gradient */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-gradient-to-t
          from-black
          via-black/60
          to-transparent
        "
      />


      {/* Movie Information */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-3
        "
      >

        <h2
          className="
            text-white
            text-sm
            font-semibold
            truncate
          "
        >
          {movie.name}
        </h2>


        <div className="flex items-center gap-1 mt-1">

          <span className="text-[#d4af37]">
            ★
          </span>

          <span className="text-white text-sm">
            {movie.rating}
          </span>

        </div>

      </div>

    </div>
  );
};

export default Moviecard;