import React, { useState } from 'react'
import TournamentTable from "./TournamentTable"

export default function TournamentManagement() {

  const [tournaments, setTournaments] = useState([
    {id: 0, tournamentName: "Tournament1", startingDate: "2025-1-1", endingDate: "2025-2-2", logo: "Logo1", numberOfTeams: 10, status: false, action: {
      edit: false,
      delete: false
    }},
    {id: 1, tournamentName: "Tournament2", startingDate: "2025-1-1", endingDate: "2025-2-2", logo: "Logo2", numberOfTeams: 10, status: true, action: {
      edit: false,
      delete: false
    }},
  ])

  const onToggleStatusButton = (tournamentId) => {
     setTournaments(tournaments.map(tournament => tournament.id === tournamentId ?{...tournament, status: !tournament.status} : tournament ))
  }


  return (
    <>
        <TournamentTable
            tournaments={tournaments}
            onToggleStatusButton={onToggleStatusButton}
        />
    </>
  )
}
