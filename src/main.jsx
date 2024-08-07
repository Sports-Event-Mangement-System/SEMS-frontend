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
import Account from './components/Account/Account';
import LogIn from './components/Account/LogIn';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

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
        path: '/account',
        element: <Account />
      },{
        path: '/LogIn',
        element: <LogIn />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
