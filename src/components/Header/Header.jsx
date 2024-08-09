import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../store/UserSlice';
import ProfileDropdown from '../Account/ProfileDropdown';

function Header() {
      const dispatch = useDispatch();
      const { user } = useSelector(state => state.auth);

      const [profileDropdown, setProfileDropdown] = useState(false);

      return (
            <>
                  <header className='flex justify-center'>
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
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                                      >
                                                            Home
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/about"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                                      >
                                                            About Us
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/tournaments"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                                      >
                                                            Tournaments
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/gallery"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                                      >
                                                            Gallery
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/contact"
                                                            className={({ isActive }) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                                      >
                                                            Contact Us
                                                      </NavLink>
                                                </li>
                                                <div className='flex gap-24'>
                                                      <NavLink>
                                                            Search
                                                      </NavLink>
                                                      {user ? (
                                                            <NavLink>
                                                                  <span onClick={() => dispatch(logout())}>Logout</span>
                                                            </NavLink>
                                                      ) : (
                                                            <NavLink to="/logIn"
                                                                  className={({ isActive }) => `  ${isActive ? 'text-green-500' : 'text-black'}`
                                                                  }
                                                            >
                                                                  Log In
                                                            </NavLink>
                                                      )}
                                                </div>
                                          </ul>
                                    </div>
                                    <div className='cursor-pointer rounded-md py-2 px-4 bg-slate-100 relative' onClick={() => setProfileDropdown(prev => !prev)}>
                                          Account

                                          {
                                                profileDropdown && <ProfileDropdown />
                                          }
                                    </div>

                                     

                              </div>
                        </nav>
                  </header>
            </>
      )
}

export default Header