import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home/Home';
import About from './components/About Us/About';
import Tournaments from './components/Tournaments/Tournaments';
import Gallery from './components/Gallery/Gallery'
import Contact from './components/Contact Us/Contact';
import LogIn from './components/Account/LogIn';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/tournaments',
        element: <Tournaments />
      },
      {
        path: '/gallery',
        element: <Gallery />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/LogIn',
        element: <LogIn/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
