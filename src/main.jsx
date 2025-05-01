import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import TVShows from './pages/TVShows.jsx';
import Books from './pages/Books.jsx';
import Movies from './pages/Movies.jsx';
import Desc from './pages/Desc.jsx'
import Book_Desc from './pages/Book_Desc.jsx'
import Show_Desc from './pages/Show_Desc.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/SignUp.jsx';
import { UserProvider } from './components/user.jsx';

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
  },
  {
    path: '/Login',
    element: <Login/>
  },
  {
    path: '/SignUp',
    element: <SignUp/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
  
)
