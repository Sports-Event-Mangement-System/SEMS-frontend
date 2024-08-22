import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';
import { CiLogout, CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

function ProfileDropdown() {
      const dispatch = useDispatch();
      return (
            <div className='absolute bg-yellow-600 w-full right-0 py-2 px-4 rounded-b-md mt-[18vh]'>
                  <ul className="flex flex-col gap-2 text-center">
                        <li className="flex items-center gap-2">
                              <CgProfile />
                              <NavLink to="/profile">
                                    Profile
                              </NavLink>
                        </li>
                        <li className="flex items-center gap-2">
                              <CiSettings />
                              <NavLink to="/settings">
                                    Settings
                              </NavLink>
                        </li>
                        <li className="flex items-center gap-2">
                              <CiLogout />
                              <NavLink to="/" onClick={() => dispatch(logout())}>
                                    Logout
                              </NavLink>
                        </li>
                  </ul>

            </div>
      )
}

export default ProfileDropdown