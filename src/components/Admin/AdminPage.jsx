import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import TournamentManagement from './Items/Tournament/TournamentManagement'

export default function AdminPage() {
  return (
      <>
            <div className='grid grid-cols-1fr-5fr'>
                  <AdminSidebar />
                  <div className='w-full p-4'>
                        <Outlet />
                  </div>
            </div>
      </>
  )
}
