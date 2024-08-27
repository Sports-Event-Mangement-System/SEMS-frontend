import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import router from './components/Route/router';

<<<<<<< HEAD
=======
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
>>>>>>> 79a998f (code merge fix)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          theme="colored" />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
