import React, { useContext, useState } from 'react'
import TournamentTable from "./TournamentTable"
import TournamentContext from './context/TounamentContext'

export default function TournamentManagement() {

  const {values} = useContext(TournamentContext)

  return (
    <>
        <TournamentTable
            tournaments={values}
        />
    </>
  )
}
