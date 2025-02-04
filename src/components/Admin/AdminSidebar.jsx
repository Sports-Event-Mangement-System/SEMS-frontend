import React, { useState } from "react";
import { AdminSideBarData } from "./AdminSidebarData";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowDown, IoIosArrowDropleft } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";

export default function AdminSidebar() {
  const [dropdownTournament, setDropdownTournament] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  // const [dropdownTeam, setDropdownTeam] = useState(false);

  const handleDropdownTournament = () => {
    setDropdownTournament((prevValue) => !prevValue);
    // setDropdownTeam(false);
  };

  const handleDropdownTeam = () => {
    // setDropdownTeam(prevValue => !prevValue);
    setDropdownTournament(false);
  };

  const handleClickInsideDropdown = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to parent elements
  };

  const toggleSideBar = () => {
    setIsSidebarMinimized((prev) => !prev);
  };

  return (
    <div
      className={`bg-theme-color sticky top-0 left-0  text-white sidebar ${
        isSidebarMinimized ? "w-20" : "w-70"
      }`}
    >
      <div>
        {AdminSideBarData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-10 ${
              isSidebarMinimized ? "flex justify-start items-center" : ""
            }`}
          >
            <div className="flex bg-theme-color items-center justify-evenly mt-4 h-16 px-4 border-b border-gray-700">
              <Link to="/">
                <img
                  src="/public/images/adminlogo.png"
                  alt=""
                  className={`h-10 w-12 transition-all ${
                    isSidebarMinimized ? "hidden" : "block"
                  }`}
                />
              </Link>
              <p
                className={`text-center text-2xl font-extrabold text-white transition-all ${
                  isSidebarMinimized ? "hidden" : "block"
                }`}
              >
                {item.title}
              </p>

              <button onClick={toggleSideBar} className="px-2">
                <IoIosArrowDropleft
                  className={`transition-all ${
                    isSidebarMinimized ? "rotate-180" : ""
                  }`}
                  size={30}
                />
              </button>
            </div>

            <div>
              <ul className="flex flex-col gap-4">
                {item?.menuItems?.map((innerItem, index) => (
                  <li
                    key={index}
                    className="px-4"
                    onClick={() => {
                      if (innerItem.itemName === "Tournament") {
                        handleDropdownTournament();
                      }
                      if (innerItem.itemName === "Team") {
                        handleDropdownTeam();
                      }
                    }}
                  >
                    <NavLink
                      to={innerItem?.link}
                      className={({ isActive }) =>
                        `${
                          isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
                        } flex items-center p-2 rounded-lg gap-1 hover:text-white hover:font-bold`
                      }
                    >
                      <div className="p-1">
                        {typeof innerItem.icon === "string" ? (
                          <img
                            src={innerItem.icon}
                            alt={innerItem.itemName}
                            style={{ width: "20px", height: "16px" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={innerItem.icon}
                            style={{ width: "20px", height: "16px" }}
                          />
                        )}
                      </div>

                      {!isSidebarMinimized && (
                        <span className="ml-2">{innerItem.itemName}</span>
                      )}

                      {/* {innerItem.itemName}{" "} */}
                      {innerItem.itemName === "Tournament" ||
                      (innerItem.subItems?.length > 0 &&
                        !isSidebarMinimized) ? (
                        <IoIosArrowDown className="ml-1" size={20} />
                      ) : null}
                    </NavLink>

                    {innerItem.itemName === "Tournament" &&
                    dropdownTournament ? (
                      <>
                        <div
                          className="pl-6 pt-2"
                          onClick={handleClickInsideDropdown}
                        >
                          <NavLink
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "bg-gray-700"
                                  : "hover:bg-gray-700/50"
                              } flex items-center p-2 ml-6 mt-1 rounded-lg hover:text-white hover:font-bold`
                            }
                            to="addTournamentForm"
                          >
                            {" "}
                            <div
                              className={`flex items-center gap-1 ${
                                isSidebarMinimized ? "text-sm mr-3" : ""
                              }`}
                            >
                              {isSidebarMinimized ? (
                                <>
                                  <IoAdd size={20} />
                                </>
                              ) : (
                                <>
                                  <VscDash size={30} />
                                  Add
                                </>
                              )}
                            </div>
                          </NavLink>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
