import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import TVShows from './pages/TVShows.jsx';
import Books from './pages/Books.jsx';
import Movies from './pages/Movies.jsx';
import Desc from './pages/Desc.jsx'
import Book_Desc from './pages/Book_Desc.jsx'
import Show_Desc from './pages/Show_Desc.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Movies/>
  },
  {
    path: '/Books',
    element: <Books/>
  },
  {
    path: '/TVShows',
    element: <TVShows/>
  },
  {
    path: '/Desc/:id/',
    element: <Desc/>
  },
  {
    path: '/Book_Desc/:id/',
    element: <Book_Desc/>
  },
  {
    path: '/Show_Desc/:id/',
    element: <Show_Desc/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
  
)
