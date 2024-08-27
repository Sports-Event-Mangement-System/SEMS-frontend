import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import ProfileDropdown from '../Account/ProfileDropdown';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { BiSolidUserAccount } from "react-icons/bi";
import { MdDashboard } from 'react-icons/md';

function Header() {
      const { user } = useSelector(state => state.auth);
      const isAdmin = user?.role === 'admin';
      const [profileDropdown, setProfileDropdown] = useState(false);


      return (
            <>
                  <header className='sticky top-0 left-0 z-50 h-[10vh] bg-white drop-shadow-lg flex justify-center items-center w-full'>
                        <nav className='w-full p-4'>
                              <div className='flex justify-between items-center'>
                                    <div className='font-extrabold text-2xl'>
                                          <Link to="/">
                                                <img src="images/Logo.png" alt="" className='h-14 w-15 ml-7' />
                                          </Link>
                                    </div>

                                    <div>
                                          <ul className='flex gap-12 font-bold text-[18px]'>
                                                <li>
                                                      <NavLink to="/"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}
                                                `}
                                                      >
                                                            Home
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/about"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}
                                                `}
                                                      >
                                                            About Us
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/tournaments"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}
                                                `}
                                                      >
                                                            Tournaments
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/gallery"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}
                                                `}
                                                      >
                                                            Gallery
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/contact"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}
                                                `}
                                                      >
                                                            Contact Us
                                                      </NavLink>
                                                </li>
                                                <div className='flex gap-24'>
                                                      <NavLink>
                                                            Search
                                                      </NavLink>

                                                </div>
                                          </ul>
                                    </div>
                                    <div className="flex items-center gap-4">
                                          {isAdmin && (
                                                <div className="flex justify-center items-center gap-4 cursor-pointer rounded-lg w-36 h-12 py-2 px-4 border border-blue-600 bg-blue-600 text-white hover:bg-blue-700">
                                                      <NavLink to="/admin" className="flex items-center gap-2">
                                                            <MdDashboard size={21} />
                                                            <span className='text-[16px] font-semibold'>Dashboard</span>
                                                      </NavLink>
                                                </div>
                                          )}

                                          {user ? (
                                                <div
                                                      className={`group flex justify-start items-center gap-4 cursor-pointer border border-[rgb(255,156,72,1)] rounded-lg w-36 h-12 py-2 pl-6 relative bg-[rgb(255,156,72,1)] text-white text-[16px] font-semibold ${profileDropdown ? '' : 'hover:bg-orange-400 '}`}
                                                      onClick={() => setProfileDropdown(prev => !prev)}


                                                >
                                                      <BiSolidUserAccount
                                                            size={21}

                                                      />
                                                      {user.user_details.username.charAt(0).toUpperCase() + user.user_details.username.slice(1)}
                                                      {profileDropdown && <ProfileDropdown />}
                                                </div>

                                          ) : (
                                                <div className="flex gap-2 items-center text-md font-semibold">
                                                      <NavLink to="/logIn" className="text-black flex items-center gap-1 hover:underline">
                                                            <FaUser size={21} />
                                                            Log In
                                                      </NavLink>
                                                      <span className="font-bold text-2xl">/</span>
                                                      <NavLink to="/signup" className="text-black flex items-center gap-1 hover:underline">
                                                            <FaUserPlus size={21} />
                                                            SignUp
                                                      </NavLink>
                                                </div>
                                          )}

                                    </div>
                              </div>
                        </nav>
                  </header >
            </>
      )
}

export default Header