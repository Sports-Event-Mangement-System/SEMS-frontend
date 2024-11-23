import React from 'react';
import PageHeader from '../../../Ui/Header/PageHeader';
import TournamentTable from "./TournamentTable"

export default function TournamentManagement() {
  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Tournament', link: '/admin/tournament' },
  ];

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Tournament Table"
        breadcrumbItems={breadcrumbs}
      />
    
      <div className="p-6 flex-1">
        <TournamentTable />
      </div>
    </div>
  )
}
