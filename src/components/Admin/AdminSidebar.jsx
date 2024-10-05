import React, { useState } from 'react'
import { AdminSideBarData } from './AdminSidebarData'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoIosArrowDown } from "react-icons/io";
import { VscDash } from "react-icons/vsc";



export default function AdminSidebar() {

      const [dropdownTournament, setDropdownTournament] = useState(false);
      // const [dropdownTeam, setDropdownTeam] = useState(false);


      const handleDropdownTournament = () => {
            setDropdownTournament(prevValue => !prevValue);
            // setDropdownTeam(false);
      }

      const handleDropdownTeam = () => {
            // setDropdownTeam(prevValue => !prevValue);
            setDropdownTournament(false);
      }



      const handleClickInsideDropdown = (e) => {
            e.stopPropagation(); // Prevents the click event from propagating to parent elements
      };


      return (
            <>
                  <div className='bg-theme-color h-full text-white'>
                        <div>
                              {AdminSideBarData.map((item, index) => (
                                    <div key={index} className='flex flex-col gap-10'>
                                          <div className='flex bg-theme-color items-center justify-evenly h-16 mt-4'>
                                                <Link to="/">
                                                      <img src="/public/images/adminlogo.png" alt="" className='h-10 w-12' />
                                                </Link>
                                                <p className='text-center text-[27px] font-extrabold text-white'>{item.title}</p>
                                          </div>

                                          <div>
                                                <ul className='flex flex-col gap-4'>
                                                      {item?.menuItems?.map((innerItem, index) => (
                                                            <li key={index} className='px-4'
                                                                  onClick={() => {
                                                                        if (innerItem.itemName === "Tournament") {
                                                                              handleDropdownTournament();
                                                                        }
                                                                        if (innerItem.itemName === "Team") {
                                                                              handleDropdownTeam();
                                                                        }
                                                                  }}
                                                            >
                                                                  <NavLink to={innerItem?.link} className={({ isActive }) => `${isActive ? 'text-white font-bold border border-white rounded-xl' : 'text-gray-200'} flex items-center gap-1 hover:text-white hover:font-bold`} >
                                                                        <div className='p-1'><FontAwesomeIcon icon={innerItem.icon} style={{ width: '20px', height: '16px' }} /></div>
                                                                        {innerItem.itemName} <IoIosArrowDown className='ml-1' size={20} />
                                                                  </NavLink>

                                                                  {
                                                                        innerItem.itemName === "Tournament" && dropdownTournament ? (
                                                                              <>
                                                                                    <div className='pl-6 pt-2'
                                                                                          onClick={handleClickInsideDropdown}
                                                                                    >
                                                                                          <NavLink className={({ isActive }) => `${isActive ? 'text-white font-bold border border-white rounded-xl' : 'text-gray-200'} flex items-center gap-1 hover:text-white hover:font-bold`}
                                                                                                to="addTournamentForm"
                                                                                          > <div className='flex items-center gap-1'><VscDash size={30} />Add</div></NavLink>
                                                                                    </div>
                                                                              </>
                                                                        ) :
                                                                              (
                                                                                    <></>
                                                                              )
                                                                  }

                                                                  {/* {
                                                                        innerItem.itemName === "Team" && dropdownTeam ? (
                                                                              <>
                                                                                    <div className='pl-6 pt-2'
                                                                                          onClick={handleClickInsideDropdown}
                                                                                    >
                                                                                    </div>
                                                                              </>
                                                                        ) :
                                                                              (
                                                                                    <></>
                                                                              )
                                                                  } */}
                                                                  {/* {console.log(innerItem?.link)} */}
                                                            </li>


                                                      ))}
                                                </ul>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </>
      )
}
