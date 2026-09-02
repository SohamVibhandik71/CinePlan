import React from 'react'

import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landingpage from './pages/Landingpage';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Library from './pages/Library';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
};

export default App;

