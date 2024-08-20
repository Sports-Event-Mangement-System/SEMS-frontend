import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminPage() {
  return (
      <>
            <div className='grid grid-cols-1fr-5fr'>
                  <AdminSidebar />
                  <Outlet />
            </div>
      </>
  )
}
