import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function AdminSidebarItems({section_name, item1, item2, item3, iconName1, iconName2, iconName3}) {
  return (
    <>
      <div className='flex flex-col gap-4'>
                  <h2 className=''>{section_name}</h2>     
                  <div className='px-4'>
                        <ul className='flex flex-col gap-4'>
                              <li><FontAwesomeIcon icon={iconName1} color='black' /><NavLink>{item1}</NavLink></li>
                              <li><FontAwesomeIcon icon={iconName2} color='black'/><NavLink>{item2}</NavLink></li>
                              <li><FontAwesomeIcon icon={iconName3} color='black'/><NavLink>{item3}</NavLink></li>
                        </ul>
                  </div>
            </div>x
    </>
  )
}

export default AdminSidebarItems