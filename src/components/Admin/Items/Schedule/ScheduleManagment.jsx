import React from 'react'
import ScheduleTable from './ScheduleTable';
import PageHeader from '../../../Ui/Header/PageHeader';

export default function ScheduleManagment() {
  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Schedule', link: '/admin/schedule' },
  ];

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Schedule Table"
        breadcrumbItems={breadcrumbs}
      />
      <ScheduleTable />
    </div>
  )
}
