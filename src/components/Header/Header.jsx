import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import ProfileDropdown from '../Account/ProfileDropdown';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { BiSolidUserAccount } from "react-icons/bi";

function Header() {
      const { user } = useSelector(state => state.auth);

      const [profileDropdown, setProfileDropdown] = useState(false);

      return (
            <>
                  <header className='sticky top-0 left-0 z-50 h-16 bg-white drop-shadow-lg flex justify- w-full'>
                        <nav className='w-full p-4'>
                              <div className='flex justify-between items-center'>
                                    <div className='font-extrabold text-2xl'>
                                          <Link to="/">
                                                Logo
                                          </Link>
                                    </div>

                                    <div>
                                          <ul className='flex gap-12'>
                                                <li>
                                                      <NavLink to="/"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-black'}
                                                `}
                                                      >
                                                            Home
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/about"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-black'}
                                                `}
                                                      >
                                                            About Us
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/tournaments"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-black'}
                                                `}
                                                      >
                                                            Tournaments
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/gallery"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-black'}
                                                `}
                                                      >
                                                            Gallery
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/contact"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-orange-600' : 'text-black'}
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
                                    {user ? (
                                          <div className='flex justify-center items-center gap-4 cursor-pointer rounded-lg w-36 h-10 py-2 px-4 bg-orange-500 relative text-white' onClick={() => setProfileDropdown(prev => !prev)}>
                                                <BiSolidUserAccount /> Account
                                                {profileDropdown && <ProfileDropdown />}
                                          </div>
                                    ) : (
                                          <div className='flex gap-2 items-center'>
                                                <NavLink to="/logIn" className="text-black flex items-center gap-1 hover:underline">
                                                      <FaUser />
                                                      Log In
                                                </NavLink>
                                                <span className='font-bold text-2xl'>/</span>
                                                <NavLink to="/signup" className="text-black flex items-center gap-1 hover:underline">
                                                      <FaUserPlus />
                                                      SignUp
                                                </NavLink>

                                          </div>
                                    )}

                              </div>
                        </nav>
                  </header>
            </>
      )
}

export default Header