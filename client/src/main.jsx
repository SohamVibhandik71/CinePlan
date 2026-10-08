import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import { LibraryProvider } from './context/LibraryContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <ContentProvider>
      <LibraryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LibraryProvider>
    </ContentProvider>
  </AuthProvider>,

)
