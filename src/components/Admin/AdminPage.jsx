import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminPage() {
      return (
            <div className="flex min-h-screen">
                  <AdminSidebar />
                  <main className="flex-1 p-4 bg-gray-50">
                        <Outlet />
                  </main>
            </div>
      )
}
