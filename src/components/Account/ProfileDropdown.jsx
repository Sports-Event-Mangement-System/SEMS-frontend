import React from 'react'
import { NavLink } from 'react-router-dom'

function ProfileDropdown() {
  return (
    <div className='absolute bg-slate-100 w-full right-0 py-2 px-4 rounded-b-md'>
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
                        <NavLink>
                              Sign out
                        </NavLink>
                  </li>
            </ul>
    </div>
  )
}

export default ProfileDropdown