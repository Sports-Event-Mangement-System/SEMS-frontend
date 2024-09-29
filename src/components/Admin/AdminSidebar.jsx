import React, { useState } from 'react'
import { AdminSideBarData } from './AdminSidebarData'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";



export default function AdminSidebar() {

      const [dropdownTournament, setDropdownTournament] = useState(false);
      const [dropdownTeam, setDropdownTeam] = useState(false);


      const handleDropdownTournament = () => {
            setDropdownTournament(prevValue => !prevValue);
            setDropdownTeam(false);
      }

      const handleDropdownTeam = () => {
            setDropdownTeam(prevValue => !prevValue);
            setDropdownTournament(false);
      }



      const handleClickInsideDropdown = (e) => {
            e.stopPropagation(); // Prevents the click event from propagating to parent elements
      };


      return (
            <>
                  <div className='bg-orange-500 h-screen text-white'>
                        <div>
                              {AdminSideBarData.map((item, index) => (
                                    <div key={index} className='flex flex-col gap-10'>
                                          <div className='flex bg-gray-300 items-center justify-evenly h-16'>
                                                <Link to="/">
                                                      <img src="/public/images/Logo.png" alt="" className='h-12 w-13' />
                                                </Link>
                                                <p className='text-center text-2xl font-extrabold text-blue-500'>{item.title}</p>
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
                                                                  <NavLink to={innerItem?.link} className={({ isActive }) => `${isActive ? 'text-white font-bold' : 'text-gray-200'} flex items-center gap-1 hover:text-white hover:font-bold`} >
                                                                        <div className='p-1'><FontAwesomeIcon icon={innerItem.icon} style={{ width: '20px', height: '16px' }} /></div>
                                                                        {innerItem.itemName} <IoIosArrowDown className='ml-1' size={20} />
                                                                  </NavLink>

                                                                  {
                                                                        innerItem.itemName === "Tournament" && dropdownTournament ? (
                                                                              <>
                                                                                    <div className='pl-6 pt-2'
                                                                                          onClick={handleClickInsideDropdown}
                                                                                    >
                                                                                          <NavLink className={({ isActive }) => `font-medium text-sm`}
                                                                                                to="addTournamentForm"
                                                                                          > <div className='flex items-center gap-1'><MdArrowRight size={30} />Add</div></NavLink>
                                                                                    </div>
                                                                              </>
                                                                        ) :
                                                                              (
                                                                                    <></>
                                                                              )
                                                                  }

                                                                  {
                                                                        innerItem.itemName === "Team" && dropdownTeam ? (
                                                                              <>
                                                                                    <div className='pl-6 pt-2'
                                                                                          onClick={handleClickInsideDropdown}
                                                                                    >
                                                                                          <NavLink className={({ isActive }) => `font-medium text-sm`}
                                                                                                to="addTeamForm"
                                                                                          > <div className='flex items-center gap-1'><MdArrowRight size={30} />Add</div></NavLink>
                                                                                    </div>
                                                                              </>
                                                                        ) :
                                                                              (
                                                                                    <></>
                                                                              )
                                                                  }
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
