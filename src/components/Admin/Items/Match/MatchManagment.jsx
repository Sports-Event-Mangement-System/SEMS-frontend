import React, { useState } from 'react'
import MatchTable from './MatchTable';
import PageHeader from '../../../Ui/Header/PageHeader';

export default function MatchManagment() {

  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Match', link: '/admin/match' },
  ];

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Match Table"
        breadcrumbItems={breadcrumbs}
      />
      <MatchTable />
    </div>
  )
}
