import React from "react";

const Navbar = ({ onMenuClick }) => {
  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        z-40
        h-20
        px-6
        md:px-10
        flex
        items-center
        justify-between
        bg-[#080808]/95
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* MENU BUTTON */}
        <button
          onClick={onMenuClick}
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-lg
            text-white
            hover:bg-white/10
            transition
          "
          aria-label="Open menu"
        >
          <span className="text-2xl">
            ☰
          </span>
        </button>

        {/* LOGO */}
        <div
          className="
            text-[#d4af37]
            text-3xl
            md:text-4xl
            font-bold
            font-serif
            tracking-tight
          "
        >
          CinePlan
        </div>

      </div>


      {/* RIGHT SIDE - PROFILE */}
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
            border-[#d4af37]/40
          "
        />

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-white">
            Uddhav
          </p>
        </div>

      </div>

    </nav>
  );
};

export default Navbar;