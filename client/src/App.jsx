import React from 'react'
import Landingpage from './pages/Landingpage';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Library from './pages/Library';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/library' element={<Library/>}></Route>
      </Routes>
    </div>
  )
}

export default App;