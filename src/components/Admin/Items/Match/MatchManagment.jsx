import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MatchTable from './MatchTable';

export default function MatchManagment() {
  const navigate = useNavigate();

  const addNewTournament = () => {
    navigate(`/admin/addTournamentForm`);
  }

  return (
    <>
      <MatchTable />
    </>
  )
}
