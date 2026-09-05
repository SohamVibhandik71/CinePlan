import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/browse", label: "Browse" },
    { to: "/library", label: "Library" },
  ];

  return (
    <>
      {/* ================= BACKDROP ================= */}

      {isOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
          "
        />
      )}


      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-[#0d0d0d]
          border-r
          border-white/10
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        <div className="
          h-full
          flex
          flex-col
          p-6
        ">


          {/* ================= CLOSE BUTTON ================= */}

          <button
            onClick={onClose}
            className="
              absolute
              top-5
              right-5
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-lg
              text-white
              text-2xl
              hover:bg-white/10
              transition
            "
          >
            ×
          </button>


          {/* ================= PROFILE ================= */}

          <div className="
            flex
            flex-col
            items-center
            pt-8
            pb-8
            border-b
            border-white/10
          ">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="
                w-20
                h-20
                rounded-full
                object-cover
                border-2
                border-[#d4af37]
              "
            />

            <h2 className="
              mt-4
              text-lg
              font-semibold
              text-white
            ">
              Uddhav
            </h2>

            <p className="
              mt-1
              text-sm
              text-gray-500
            ">
              CinePlan User
            </p>

          </div>


          {/* ================= NAVIGATION ================= */}

          <nav className="
            flex-1
            mt-8
          ">

            <p className="
              px-3
              mb-3
              text-xs
              uppercase
              tracking-widest
              text-gray-600
            ">
              Menu
            </p>


            <div className="space-y-2">

              {navItems.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex
                    items-center
                    px-4
                    py-3
                    rounded-lg
                    text-sm
                    font-medium
                    transition

                    ${
                      isActive
                        ? "bg-[#d4af37] text-black"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {item.label}
                </NavLink>

              ))}

            </div>

          </nav>


          {/* ================= SIGN OUT ================= */}

          <div className="
            pt-6
            border-t
            border-white/10
          ">

            <button
              onClick={() => {
                console.log("Sign out clicked");
              }}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                text-red-400
                hover:bg-red-500/10
                transition
              "
            >
              Sign Out
            </button>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;