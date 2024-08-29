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
import TournamentContextProvider from './components/Admin/Items/Tournament/context/TournamentContextProvider';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TournamentContextProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            theme="colored" />
          <RouterProvider router={router} />
        </PersistGate>
      </TournamentContextProvider>
    </Provider>
  </React.StrictMode>,
)
