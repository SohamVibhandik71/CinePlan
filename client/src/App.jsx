import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return window.location.pathname === '/signup' ? <Signup /> : <Login />
}

export default App;