import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landingpage from "./pages/Landingpage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import Recommendation from "./pages/Recommendation";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Landingpage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/browse"
          element={<Browse />}
        />


        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/library"
            element={<Library />}
          />

          <Route
            path="/recommendations"
            element={<Recommendation />}
          />

        </Route>

      </Routes>
    </div>
  );
};

export default App;