import React from 'react'
import PlayerTable from './playerTable';
import PageHeader from '../../../Ui/Header/PageHeader';
export default function PlayerManagement() {
  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Player', link: '/admin/player' },
  ];

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Player Table"
        breadcrumbItems={breadcrumbs}
      />
      <PlayerTable />
    </div>
  )
}
