import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
      <header className='flex justify-center'>
            <nav className='w-full p-4'>
                  <div className='flex justify-between items-center'>
                        <div className='font-extrabold text-2xl'>
                              <Link to= "/">
                                    Logo
                              </Link>
                        </div>

                        <div>
                              <ul className='flex gap-12'>
                                    <li>
                                          <NavLink to= "/" 
                                                className={({isActive}) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                          >
                                                Home
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink to= "/about" 
                                                className={({isActive}) =>`
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                          >
                                                About Us
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink to= "/tournaments"
                                                className={({isActive}) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                          >
                                                Tournaments
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink to= "/gallery"
                                                className={({isActive}) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                          >
                                                Gallery
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink to= "/contact" 
                                                className={({isActive}) => `
                                                      ${isActive ? 'text-green-500' : 'text-black'}
                                                `}
                                          > 
                                                Contact Us
                                          </NavLink>
                                    </li>
                              </ul>
                        </div>

                        <div className='flex gap-24'>
                              <Link>
                                    Search
                              </Link>

                              <Link>
                                    Account
                              </Link>
                        </div>
                  </div>
            </nav>
      </header>
    </>
  )
}

export default Header