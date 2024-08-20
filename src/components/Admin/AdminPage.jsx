import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminArticle from './AdminArticle'

export default function AdminPage() {
  return (
    <>
      <div className='grid grid-cols-[1fr_5fr] h-screen'>
            <AdminSidebar />

            <AdminArticle  />
      </div>
    </>
  )
}
