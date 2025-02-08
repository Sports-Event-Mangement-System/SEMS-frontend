import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "../Account/ProfileDropdown";
import { FaUser, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
// import { BiSolidUserAccount } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sticky top-0 left-0 z-50 h-[10vh] bg-white drop-shadow-md flex justify-center items-center w-full">
        <nav className="w-full p-4">
          <div className="flex justify-between items-center">
            <div className="font-extrabold text-2xl">
              <Link to="/">
                <img
                  src="images/Logo.png"
                  alt=""
                  className="lg:h-14 lg:w-15 md:h-11 md:w-14 sm:h-9 sm:w-12 h-7 w-10 ml-7"
                />
              </Link>
            </div>

            {/* Hamburger Menu for small screens */}
            <div className="md:hidden">
              <button onClick={toggleSidebar}>
                <FaBars size={24} />
              </button>
            </div>

            {/* Regular Nav Links for medium and larger screens */}
            <div className="hidden md:flex">
              <ul className="flex lg:gap-10 md:text-[14px] md:gap-10 font-bold lg:text-[18px]">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tournaments"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }
                  >
                    Tournaments
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center gap-4">
              {isAdmin && (
                <div className="flex justify-center items-center gap-4 cursor-pointer rounded-lg w-fit h-fit md lg:py-3 lg:px-4 md:px-2 md:py-2 border border-blue-600 bg-blue-600 text-white hover:bg-blue-700">
                  <NavLink
                    to="/admin/dashboardManagment"
                    className="flex items-center gap-2"
                  >
                    <MdDashboard size={21} />
                    <span className="lg:text-[16px] md:text-[13px] font-semibold">
                      Dashboard
                    </span>
                  </NavLink>
                </div>
              )}

              {user ? (
                <div
                  className={`group flex justify-start items-center gap-1 cursor-pointer w-36 h-12 py-2 pl-6 relative  text-black text-[16px] font-semibold ${
                    profileDropdown ? "" : " "
                  }`}
                  onClick={() => setProfileDropdown((prev) => !prev)}
                >
                  <span className="text-blue-600">
                    {user.user_details?.username?.charAt(0).toUpperCase() +
                      user.user_details?.username?.slice(1)}
                  </span>

                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white text-xl font-normal border-blue-500">
                    {user.user_details?.profile_image ? (
                      <img
                        src={user.user_details?.profile_image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.user_details?.username?.charAt(0).toUpperCase()
                    )}{" "}
                  </div>
                  {profileDropdown && <ProfileDropdown />}
                </div>
              ) : (
                <div className="flex gap-2 items-center text-md font-semibold">
                  <NavLink
                    to="/logIn"
                    className="text-black flex items-center gap-1 hover:underline"
                  >
                    <FaUser size={21} />
                    Log In
                  </NavLink>
                  <span className="font-bold text-2xl">/</span>
                  <NavLink
                    to="/signup"
                    className="text-black flex items-center gap-1 hover:underline"
                  >
                    <FaUserPlus size={21} />
                    SignUp
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Sidebar for small screens */}
        {isSidebarOpen && (
          <div
            className={`fixed top-0 right-0 w-72 min-h-screen bg-slate-50 shadow-lg transform transition-transform duration-300 p-5 flex flex-col gap-6 z-[100] md:hidden ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button className="self-end mb-4" onClick={toggleSidebar}>
              <FaTimes size={25} />
            </button>
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/tournaments", text: "Tournaments" },
              { to: "contact", text: "Contact Us" },
            ].map(({ to, text }) => (
              <NavLink
                key={to}
                to={to}
                className={`border-b-2 border-slate-500 pb-2  ${({
                  isActive,
                }) =>
                  isActive
                    ? "text-orange-600 "
                    : "text-gray-700 hover:text-orange-600"}`}
                onClick={() => isSidebarOpen(false)}
              >
                {text}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin/dashboardManagment"
                className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => isSidebarOpen(false)}
              >
                <MdDashboard size={21} /> Dashboard
              </NavLink>
            )}

            {user ? (
              <div
                className={`group flex justify-start items-center gap-1 cursor-pointer w-36 h-12 py-2 pl-6 relative  text-black text-[16px] font-semibold ${
                  profileDropdown ? "" : " "
                }`}
                onClick={() => setProfileDropdown((prev) => !prev)}
              >
                <span className="text-blue-600">
                  {user.user_details?.username?.charAt(0).toUpperCase() +
                    user.user_details?.username?.slice(1)}
                </span>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white text-xl font-normal hover:border-2 border-blue-500">
                  {user.user_details?.profile_image ? (
                    <img
                      src={user.user_details?.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.user_details?.username?.charAt(0).toUpperCase()
                  )}
                </div>
                {profileDropdown && <ProfileDropdown />}
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-md font-semibold">
                <NavLink
                  to="/logIn"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaUser size={21} /> Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaUserPlus size={21} /> SignUp
                </NavLink>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
