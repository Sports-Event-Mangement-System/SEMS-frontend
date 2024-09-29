import React, { useState } from "react";
import FormInput from "../Ui/Input";
import DragDropFile from "../Ui/DragDrop/DragDropFile";

export default function TeamManagement() {
  const [images, setImages] = useState([]);

  const [playerList, setPlayerList] = useState([{ playerName: "" }]);

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index].playerName = value;
    updatedPlayers[index].playerEmail = value;
    setPlayerList(updatedPlayers);
  };

  const addPlayer = () => {
    setPlayerList([...playerList, { playerName: "" }]);
  };

  const removePlayer = (id) => {
    const updatedPlayers = playerList.filter((_, playerId) => playerId != id);
    setPlayerList(updatedPlayers);
  };

  console.log(playerList)

  return (
    <div className='h-screen flex mt-14 justify-center'>
      <div className='shadow-2xl rounded-2xl h-fit bg-slate-200'>
        <h1 className='text-3xl text-center text-orange-600 font-semibold mt-10 '>Team Form</h1>
        <p className='text-md text-center text-orange-600 font-normal'>Register Your team Righ Now!</p>
        <form action="">
          <div className="flex flex-col gap-4">
            <FormInput
              name=""
              id="team name"
              type="text"
              label="Team Name"
              placeholder="Enter Team Name"
            />

            <FormInput
              name=""
              id="team coach"
              type="text"
              label="Team Coach"
              placeholder="Enter Coach Name"
            />



            <FormInput
              name=""
              id="team captain"
              type="text"
              label="Team Captain"
              placeholder="Enter Team Captain's Name"
            />
            <FormInput
              name=""
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />

            <FormInput
              name=""
              id="phone number"
              type="number"
              label="Phone Number"
              placeholder="Enter Your Team's Phone Number"
            />

            <DragDropFile
              setFile={setImages}
              label="Team Logo"
              name=""
              accepts="image/png, image/jpeg, image/jpg"
            />
            <div className="flex justify-between gap-8">
              <div className="w-6/12">
                {playerList.map((player, index) => (
                  <div key={index}>
                    <label htmlFor="">Player Name</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={player.playerName}
                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                        placeholder={`Player ${index + 1} Name`}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-6/12">
                {playerList.map((player, index) => (
                  <div key={index}>
                    <label htmlFor="">Player Email</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={player.playerEmail}
                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                        placeholder={`Player ${index + 1} Email`}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removePlayer(index)}
                        className="bg-red-600 p-2.5 rounded-lg text-white font-medium ms-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={addPlayer}
              className="bg-green-500 p-2.5 rounded-lg text-white font-medium self-end"
            >
              Add Player
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
