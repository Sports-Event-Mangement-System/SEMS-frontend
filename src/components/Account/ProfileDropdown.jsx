import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { TbSettings } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

function ProfileDropdown() {
  const dispatch = useDispatch();
  return (
    <div className="absolute flex items-center justify-center bg-white drop-shadow-[0-8px_10px_rgba(0,0,0,0.20)] w-fit right-0 p-4 rounded-sm top-full mt-1">
      <ul className="flex flex-col  gap-2">
        <li className="flex items-center gap-4">
          <NavLink
            to="/profile"
            className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-600"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }
                                                `}
          >
            <div className="flex items-center gap-4 ">
              <CgProfile
                className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-600"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }`}
                size={21}
              />
              <span>Profile</span>
            </div>
          </NavLink>
        </li>

        <li className="flex items-center gap-4">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-600"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }
                                                `}
          >
            <div className="flex items-center gap-4 ">
              <TbSettings
                className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-600"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }`}
                size={21}
              />
              <span>Setting</span>
            </div>
            {/* </NavLink>
                              <TbSettings className='text-white' size={21} />
                              <NavLink to="/settings">
                                    Settings */}
          </NavLink>
        </li>
        <li className="flex items-center gap-4">
          <NavLink
            to="/"
            onClick={() => dispatch(logout())}
            className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-500"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }
                                                `}
          >
            <div className="flex items-center gap-4 ">
              <RiLogoutBoxLine
                className={({ isActive }) => `
                                                      ${
                                                        isActive
                                                          ? "text-gray-500"
                                                          : "text-gray-500 hover:text-gray-600"
                                                      }`}
                size={21}
              />
              <span>Logout</span>
            </div>
            {/* </NavLink>
                              <RiLogoutBoxLine className='text-white' size={21} />
                              <NavLink to="/" onClick={() => dispatch(logout())}>
                                    Logout */}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
