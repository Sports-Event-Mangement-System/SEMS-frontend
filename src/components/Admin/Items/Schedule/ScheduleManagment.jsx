import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ScheduleTable from './ScheduleTable';

export default function ScheduleManagment() {
  const navigate = useNavigate();

  const addNewTournament = () => {
    navigate(`/admin/addTournamentForm`);
  }

  return (
    <>
      <ScheduleTable />
    </>
  )
}
