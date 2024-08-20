import React from 'react'
import { AdminSideBarData } from './AdminSidebarData'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function AdminSidebar() {
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
                                                <li key={index} className='px-4'>
                                                      <NavLink to={innerItem?.link} className={({isActive}) => `${isActive ? 'opacity-70' : 'opacity-100'} flex items-center gap-1`} >
                                                            <FontAwesomeIcon icon={innerItem.icon} color='white' style={{width: '20px', height: '16px'}} /> 
                                                            {innerItem.itemName}
                                                      </NavLink>
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
