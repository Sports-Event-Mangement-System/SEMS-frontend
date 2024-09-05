import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, useInactivityLogout } from './store/UserSlice';


function App() {
  // const dispatch = useDispatch();
  // useInactivityLogout(() => dispatch(logout()), 2500 );
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;