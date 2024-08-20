import React from 'react'
import AdminSidebarItems from './AdminSidebarItems'
import { faGauge, faAdn, } from '@fortawesome/free-solid-svg-icons/faGauge'

export default function AdminSidebar() {
  return (
    <>
      <div className='bg-orange-500 text-white flex flex-col gap-10 px-4 py-4'>
            <h1 className='text-2xl font-bold text-center'>Admin</h1> 
            
            <AdminSidebarItems
                  section_name="MENU"
                  iconName1={faGauge}
                  iconName2={faAdn}
                  item1="Dashboards"
                  item2="Apps"
                  item3="Layouts"
            />

            <AdminSidebarItems 
                  section_name="PAGES"
                  item1="Authentication"
                  item2="Pages"
                  item3="Landing"
            />


      </div>      
    </>
  )
}
