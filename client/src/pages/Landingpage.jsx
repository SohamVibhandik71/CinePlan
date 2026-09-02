import React from "react";
import assets from "../assets/assets.js";

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden relative">

      {/* ================= BACKGROUND ================= */}
        <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">

        {/* Background Image */}
        <img
            src={assets.tickets_bg}
            alt=""
            className="
            absolute
            top-0
            left-0
            w-full
            h-full
            object-cover
            object-center
            "
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Left Gradient */}
        <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/90
            via-black/55
            to-transparent
        " />

        {/* Bottom Gradient */}
        <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#080808]
            via-transparent
            to-black/20
        " />

        </div>


      {/* ================= NAVBAR ================= */}
      <nav className="
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        border-white/10
        bg-black/40
        backdrop-blur-md
      ">

        <div className="
          max-w-[1440px]
          mx-auto
          px-6
          md:px-12
          py-3
          flex
          items-center
          justify-between
        ">

          {/* Logo */}
          <div className="
            font-serif
            text-2xl
            md:text-3xl
            font-bold
            text-[#f2ca50]
          ">
            CinePlan
          </div>


          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-6">

            <button className="
              text-xs
              md:text-sm
              font-medium
              text-white
              hover:text-[#f2ca50]
              transition-colors
            ">
              Sign In
            </button>


            <button className="
              bg-[#f2ca50]
              text-black
              px-4
              md:px-5
              py-2
              rounded-md
              text-xs
              md:text-sm
              font-semibold
              hover:bg-[#ffd968]
              transition-all
              duration-300
              hover:scale-105
            ">
              Sign Up
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HERO ================= */}
      <main className="
        relative
        z-10
        min-h-screen
        flex
        items-center
        px-6
        md:px-12
        pt-20
        pb-16
      ">

        <div className="
          max-w-[1440px]
          w-full
          mx-auto
        ">

          <div className="
            max-w-2xl
            flex
            flex-col
            items-start
          ">

            {/* Small Heading */}
            <p className="
              text-[#f2ca50]
              uppercase
              tracking-[0.3em]
              text-[10px]
              md:text-xs
              font-bold
              mb-3
            ">
              An Exclusive Experience
            </p>


            {/* Main Heading */}
            <h1 className="
              font-serif
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]
            ">

              The Curtain
              <br />

              <span className="text-[#f2ca50]">
                Rises
              </span>

            </h1>


            {/* Description */}
            <p className="
              mt-4
              max-w-lg
              text-sm
              md:text-base
              lg:text-lg
              leading-relaxed
              text-white/70
            ">
              Discover movies, plan your watchlist and
              experience cinema like never before.
            </p>


            {/* Buttons */}
            <div className="
              mt-6
              flex
              flex-col
              sm:flex-row
              gap-3
            ">

              {/* Get Started */}
              <button className="
                group
                flex
                items-center
                justify-center
                gap-2
                bg-[#f2ca50]
                text-black
                px-5
                md:px-6
                py-3
                rounded-md
                font-semibold
                text-xs
                md:text-sm
                transition-all
                duration-300
                hover:bg-[#ffd968]
                hover:scale-[1.03]
                shadow-[0_0_20px_rgba(242,202,80,0.18)]
              ">

                Get Started

                {/* Smaller Arrow */}
                <span className="
                  text-base
                  md:text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                ">
                  →
                </span>

              </button>


              {/* About Us */}
              <button className="
                px-5
                md:px-6
                py-3
                rounded-md
                border
                border-[#f2ca50]
                text-[#f2ca50]
                font-semibold
                text-xs
                md:text-sm
                bg-black/20
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-[#f2ca50]
                hover:text-black
              ">
                About Us
              </button>

            </div>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="
        absolute
        bottom-0
        left-0
        right-0
        z-20
        border-t
        border-white/10
        bg-black/50
        backdrop-blur-md
      ">

        <div className="
          max-w-[1440px]
          mx-auto
          px-6
          md:px-12
          py-3
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-2
        ">

          {/* Footer Logo */}
          <div className="
            font-serif
            text-lg
            md:text-xl
            font-bold
            text-[#f2ca50]
          ">
            CinePlan
          </div>


          {/* Footer Links */}
          <div className="
            flex
            flex-wrap
            justify-center
            gap-3
            md:gap-5
            text-[10px]
            md:text-xs
            text-white/60
          ">

            <a
              href="#"
              className="hover:text-[#f2ca50] transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-[#f2ca50] transition-colors"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="hover:text-[#f2ca50] transition-colors"
            >
              Press Kit
            </a>

            <a
              href="#"
              className="hover:text-[#f2ca50] transition-colors"
            >
              Contact
            </a>

          </div>


          {/* Copyright */}
          <div className="
            text-[9px]
            md:text-[11px]
            text-white/40
            text-center
          ">
            © 2024 CinePlan Studios. All Rights Reserved.
          </div>

        </div>

      </footer>

    </div>
  );
};

export default Landingpage;