import React, { useState } from 'react'
import TournamentTable from "./TournamentTable"
import { useNavigate } from 'react-router-dom';

export default function TournamentManagement() {
  const navigate = useNavigate();

  const addNewTournament = () => {
    navigate(`/admin/addTournamentForm`);
  }

  return (
    <>
      <div>
        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={addNewTournament}
        >
          Add Tournament
        </button>
      </div>
      <TournamentTable />
    </>
  )
}
