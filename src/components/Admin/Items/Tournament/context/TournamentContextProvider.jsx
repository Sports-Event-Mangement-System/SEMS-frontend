import React, { useState } from "react";
import TournamentContext from "./TounamentContext";

const TournamentContextProvider = ({children}) => {

      const [values, setValues] = useState([])

      const addNewValues = (newValues) => {
            setValues(prevValues => {
                  // Ensure new tournament has a unique ID
                  const newId = prevValues.length > 0 ? Math.max(prevValues.map(t => t.id)) + 1 : 0;
                  return [...prevValues, { ...newValues, id: newId }];
                });
      }

      const deleteTournament = (tournamentId) => {
            setValues((prevValues) => prevValues.filter((tournament) => tournament.id !== tournamentId))
      }


      const onToggleStatusButton = (tournamentId) => {
            setValues(values.map(tournament => tournament.id === tournamentId ?{...tournament, status: !tournament.status} : tournament ))
      }

      return(
            <TournamentContext.Provider value={{values, addNewValues, deleteTournament, onToggleStatusButton}}> 
                  {children}      
            </TournamentContext.Provider>
      )

}

export default TournamentContextProvider;