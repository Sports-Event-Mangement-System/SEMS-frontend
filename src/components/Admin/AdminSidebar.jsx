import React from 'react'
import { AdminSideBarData } from './AdminSidebarData'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <>
      <div className='bg-orange-500 h-screen text-white'>
            <div>
                  {AdminSideBarData.map((item, index) => (
                        <div key={index}>
                              <p>{item.title1}</p>
                              <div>
                                    <ul>
                                          {item?.menuItems?.map((innerItem, index) => (
                                                <li key={index}>
                                                      <NavLink to={innerItem.link} >{innerItem.itemName}</NavLink>
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
