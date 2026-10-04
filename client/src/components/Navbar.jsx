import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <nav
      className="
        sticky
        top-0
        z-40
        h-14
        w-full
        px-6
        md:px-8
        flex
        items-center
        bg-[#080808]/95
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >
      <div className="w-full flex items-center justify-between gap-6">

        {/* ================= LEFT SIDE ================= */}

        <div className="flex items-center gap-6 shrink-0">

          {/* LOGO / HOME BUTTON */}

          {isHome ? (
            <div
              className="
                text-[#d4af37]
                text-2xl
                font-bold
                font-serif
                tracking-tight
              "
            >
              CinePlan
            </div>
          ) : (
            <Link
              to="/home"
              className="
                flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-lg
                border
                border-[#d4af37]/40
                bg-[#d4af37]/10
                text-[#f2ca50]
                text-sm
                font-medium
                transition-all
                duration-200
                hover:bg-[#d4af37]
                hover:text-black
                hover:border-[#d4af37]
                hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]
              "
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span>Home</span>
            </Link>
          )}

          {/* ================= CATEGORIES ================= */}

          <div className="hidden md:flex items-center gap-1">

            <button
              className="
                px-4
                py-1.5
                rounded-full
                text-sm
                font-medium
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              Anime
            </button>

            <button
              className="
                px-4
                py-1.5
                rounded-full
                text-sm
                font-medium
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              Movies
            </button>

            <button
              className="
                px-4
                py-1.5
                rounded-full
                text-sm
                font-medium
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              Series
            </button>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-4">

          {/* SEARCH */}

          <div className="relative w-44 sm:w-52 lg:w-64">

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                h-9
                px-4
                pr-10
                rounded-full
                bg-white/5
                border
                border-white/10
                outline-none
                text-sm
                text-white
                placeholder:text-gray-500
                transition
                focus:border-[#d4af37]/60
                focus:bg-white/[0.07]
              "
            />

            <Search
              size={17}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-2">

            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Profile"
              className="
                w-8
                h-8
                rounded-full
                object-cover
                border
                border-[#d4af37]/40
              "
            />

            <p className="hidden lg:block text-sm font-semibold text-white">
              Uddhav
            </p>

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;