import React, { useContext, useState } from "react";
import TournamentContext from "./context/TounamentContext";

export default function TournamentForm() {
  const [tournamentName, setTournamentName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [logo, setLogo] = useState(undefined);
  const [numberOfTeams, setNumberOfTeams] = useState("");


  const {addNewValues} = useContext(TournamentContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewValues({tournamentName, startingDate, endingDate, logo, numberOfTeams})

    setTournamentName('')
    setStartingDate('')
    setEndingDate('')
    setLogo(undefined) 
    setNumberOfTeams('')

  }

  return (
    <>
      <div>Add form</div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Tounament Name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
          />

          <input 
            type="date" 
            placeholder="Starting Date" 
            value={startingDate} 
            onChange={(e) => setStartingDate(e.target.value)}
          />

          <input 
            type="date" 
            placeholder="Ending Date" 
            value={endingDate} 
            onChange={(e) => setEndingDate(e.target.value)}
          />

          <input 
            type="file" 
            accept="image/*" 
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="Number of Teams"
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
          />

          <button>Submit</button>  
        </div>
      </form>
    </>
  );
}
