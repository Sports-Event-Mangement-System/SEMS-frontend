import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';
import { TbSettings } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

function ProfileDropdown() {
      const dispatch = useDispatch();
      return (
            <div className='absolute flex justify-start pl-6 bg-[rgb(255,156,72,1)] w-full right-0 py-2 px-4 rounded-b-md mt-[18vh]'>
                  <ul className="flex flex-col  gap-2 ">
                        <li className="flex items-center gap-4">
                              <CgProfile className='text-white ' size={21} />
                              <NavLink to="/profile">
                                    Profile
                              </NavLink>
                        </li>
                        <li className="flex items-center gap-4">
                              <TbSettings className='text-white' size={21} />
                              <NavLink to="/settings">
                                    Settings
                              </NavLink>
                        </li>
                        <li className="flex items-center gap-4">
                              <RiLogoutBoxLine className='text-white' size={21} />
                              <NavLink to="/" onClick={() => dispatch(logout())}>
                                    Logout
                              </NavLink>
                        </li>
                  </ul>

            </div>
      )
}

export default ProfileDropdown