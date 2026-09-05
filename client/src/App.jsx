import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landingpage from './pages/Landingpage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/browse" ||
    location.pathname === "/library";
  return (

    
     <div>

      {showNavbar && (
        <>
          <Navbar
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </>
      )}

      <Routes>

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
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/browse"
          element={<Browse />}
        />

        <Route
          path="/library"
          element={<Library />}
        />

      </Routes>

    </div>
  );
};

export default App;