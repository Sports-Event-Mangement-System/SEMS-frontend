import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, useInactivityLogout } from './store/UserSlice';


function App() {
  const dispatch = useDispatch();
  //Logout User if inactive for 1 hour
  useInactivityLogout(() => dispatch(logout()), 3600000);
  return (
    <div>
      <Header />  
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;