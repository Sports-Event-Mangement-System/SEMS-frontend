import React, { useContext, useState } from "react";
import TournamentContext from "./context/TounamentContext";
import FormInput from "./FormInput";

export default function TournamentForm() {
  const [tournamentName, setTournamentName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [logo, setLogo] = useState(undefined);
  const [numberOfTeams, setNumberOfTeams] = useState("");

  const { addNewValues } = useContext(TournamentContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewValues({
      tournamentName,
      startingDate,
      endingDate,
      logo,
      numberOfTeams,
    });

    setTournamentName("");
    setStartingDate("");
    setEndingDate("");
    setLogo(undefined);
    setNumberOfTeams("");
  };

  return (
    <>
      <div>Add form</div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-8 shadow-2xl">
          <div className="flex flex-col gap-4">
            <FormInput 
              id="tournamentname"
              type='text'
              label='Tournament Name'
              placeholder='Tournament Name'
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
            />

            <FormInput 
              id='starting'
              type='date'
              label='Starting Date'
              placeholder='Starting Date'
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
            />

            <FormInput 
               id='ending'
               type='date'
               label='Ending Date'
               placeholder='Ending Date'
               value={endingDate}
               onChange={(e) => setEndingDate(e.target.value)}
            />

            <FormInput 
              id='logo'
              type='file'
              accept='image/*'
              label='Logo'
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />

            <FormInput 
              id='numberOfTeams'
              type='text'
              label='Number Of Teams'
              placeholder='Number Of Teams'
              value={numberOfTeams}
              onChange={(e) => setNumberOfTeams(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 flex self-end text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </>
  );
}
