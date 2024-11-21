import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminPage() {
      return (
            <>
                  <div className='flex h-screen overflow-x-hidden'>
                        <AdminSidebar />
                        <div className='flex-1 p-4 overflow-auto'>
                              <Outlet />
                        </div>
                  </div>
            </>
      )
}
