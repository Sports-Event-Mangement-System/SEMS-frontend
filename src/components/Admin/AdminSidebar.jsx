import React, { useState } from 'react'
import { AdminSideBarData } from './AdminSidebarData'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
                              <p className='text-center text-3xl font-extrabold'>{item.title}</p>
                              <div>
                                    <ul className='flex flex-col gap-4'>
                                          {item?.menuItems?.map((innerItem, index) => (
                                                <li key={index} className='px-4'
                                                      onClick={() => {
                                                            if(innerItem.itemName === "Tournament"){
                                                                  handleDropdownTournament();
                                                            }
                                                            if(innerItem.itemName === "Team"){
                                                                  handleDropdownTeam();
                                                            }
                                                      }}
                                                >
                                                      <NavLink to={innerItem?.link} className={({isActive}) => `${isActive ? 'opacity-70' : 'opacity-100'} flex items-center gap-1`} >
                                                            <FontAwesomeIcon icon={innerItem.icon} color='white' style={{width: '20px', height: '16px'}} /> 
                                                            {innerItem.itemName}
                                                      </NavLink>

                                                      {
                                                            innerItem.itemName === "Tournament" && dropdownTournament ? (
                                                                  <>
                                                                       <div className='pl-6 pt-2'
                                                                              onClick={handleClickInsideDropdown}
                                                                       >
                                                                         <NavLink  className={({isActive}) => `font-medium text-sm`}
                                                                               to="addTournamentForm"
                                                                              >Add</NavLink> 
                                                                       </div>               
                                                                  </>
                                                            ):
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
                                                                         <NavLink  className={({isActive}) => `font-medium text-sm`}
                                                                               to="addTeamForm"
                                                                              >Add</NavLink> 
                                                                       </div>               
                                                                  </>
                                                            ):
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
