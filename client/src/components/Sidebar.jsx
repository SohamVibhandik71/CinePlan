import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Search,
  LayoutDashboard,
  Library,
  Sparkles,
  LogOut,
} from "lucide-react";

const Sidebar = () => {

  const primaryItems = [
    {
      to: "/home",
      label: "Home",
      icon: House,
    },
    {
      to: "/browse",
      label: "Browse",
      icon: Search,
    },
  ];

  const userItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/library",
      label: "Library",
      icon: Library,
    },
    {
      to: "/recommendations",
      label: "Recommendations",
      icon: Sparkles,
    },
  ];

  return (
    <aside
      className="
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
      "
    >

      <div className="flex h-full flex-col p-6">

        {/* ================= BRAND ================= */}

        <div className="mb-10 px-3">

          <h1 className="
            text-2xl
            font-semibold
            tracking-wide
            text-[#d4af37]
          ">
            CinePlan
          </h1>

          <p className="
            mt-1
            text-xs
            tracking-wider
            text-gray-500
          ">
            PLAN. WATCH. ENJOY.
          </p>

        </div>


        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1">

          {/* PRIMARY NAVIGATION */}

          <div className="space-y-2">

            {primaryItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-colors

                    ${
                      isActive
                        ? "bg-[#d4af37] text-black"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>
                    {item.label}
                  </span>
                </NavLink>
              );

            })}

          </div>


          {/* ================= SEPARATOR ================= */}

          <div className="
            my-6
            h-px
            bg-white/10
          " />


          {/* USER NAVIGATION */}

          <div className="space-y-2">

            {userItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-colors

                    ${
                      isActive
                        ? "bg-[#d4af37] text-black"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>
                    {item.label}
                  </span>
                </NavLink>
              );

            })}

          </div>

        </nav>


        {/* ================= PROFILE ================= */}

        <div className="
          mb-5
          border-t
          border-white/10
          pt-5
        ">

          <div className="
            flex
            items-center
            gap-3
            px-2
          ">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="
                h-10
                w-10
                rounded-full
                border
                border-[#d4af37]
                object-cover
              "
            />

            <div>

              <p className="
                text-sm
                font-medium
                text-white
              ">
                Uddhav
              </p>

              <p className="
                text-xs
                text-gray-500
              ">
                CinePlan User
              </p>

            </div>

          </div>

        </div>


        {/* ================= SIGN OUT ================= */}

        <button
          onClick={() => {
            console.log("Sign out clicked");
          }}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            px-4
            py-3
            text-sm
            font-medium
            text-red-400
            transition
            hover:bg-red-500/10
          "
        >

          <LogOut size={18} />

          <span>
            Sign Out
          </span>

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;