import React, { useState } from "react";
import FormInput from "../Tournament/FormInput";
import DragDropFile from "../../../Ui/DragDrop/DragDropFile";

export default function TeamManagement() {
  const [playerList, setPlayerList] = useState([{ playerName: "" }]);

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index].playerName = value;
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
                    placeholder={`Player ${index + 1}`}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className="bg-red-600 p-2.5 rounded-lg text-white font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPlayer}
              className="bg-green-500 p-2.5 rounded-lg text-white font-medium"
            >
              Add Player
            </button>
          </div>

          <div className="w-6/12">
            <FormInput
              name=""
              id="team captain"
              type="text"
              label="Team Captain"
              placeholder="Enter Team Captain's Name"
            />
          </div>
        </div>

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

        <DragDropFile name="" accepts="image/png, image/jpeg, image/jpg" />
      </div>
    </form>
  );
}
