import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';

function ProfileDropdown() {
      const dispatch = useDispatch();
      return (
            <div className='absolute bg-orange-500 w-full right-0 py-2 px-4 rounded-b-md mt-[18vh]'>
                  <ul className='flex flex-col gap-2 text-center'>
                        <li>
                              <NavLink to='/profile'>
                                    Profile
                              </NavLink>
                        </li>
                        <li>
                              <NavLink>
                                    Settings
                              </NavLink>
                        </li>
                        <li>
                              <NavLink onClick={() => dispatch(logout())}>
                                    Logout
                              </NavLink>
                        </li>
                  </ul>
            </div>
      )
}

export default ProfileDropdown