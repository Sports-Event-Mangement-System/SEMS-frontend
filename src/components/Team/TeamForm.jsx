import React, { useState, useEffect } from "react";
import Input from "../Ui/FormInput/Input";
import DragDropFile from "../Ui/DragDrop/DragDropFile";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function TeamManagement() {
  const location = useLocation();
  const { tournamentData } = location.state || {};

  const [image, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (tournamentData?.min_players_per_team) {
      const initialPlayers = Array.from({ length: tournamentData.min_players_per_team }, () => ({
        playerName: "",
        playerEmail: ""
      }));
      setPlayerList(initialPlayers);
    }
  }, [tournamentData]);


  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index][field] = value;
    setPlayerList(updatedPlayers);
  };

  const addPlayer = () => {
    if (playerList.length < tournamentData.max_players_per_team) {
      setPlayerList([...playerList, { playerName: "", playerEmail: "" }]);
    }
  };

  const removePlayer = (index) => {
    if (playerList.length > tournamentData.min_players_per_team) {
      const updatedPlayers = playerList.filter((_, playerId) => playerId !== index);
      setPlayerList(updatedPlayers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tournament_id", tournamentData?.id || 0);
    formData.append("team_name", teamName || "");
    formData.append("coach_name", coachName || "");
    formData.append("phone_number", phoneNumber || "");
    formData.append("email", email || "");
    formData.append("address", address || "");
    formData.append("team_logo", image[0]);
    formData.append("player_number", playerList.length);

    // Append players data
    playerList.forEach((player, index) => {
      formData.append(`players[${index}][player_name]`, player.playerName);
      formData.append(`players[${index}][player_email]`, player.playerEmail);
    });

    axios.post(`${import.meta.env.VITE_API_URL}api/store/team`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          navigate(`/tournamentDetails/${tournamentData?.id}`);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.errors || { message: err.message });
      });
  };

  return (
    <div className='flex mt-14 justify-center'>
      <div className='shadow-2xl rounded-2xl h-fit px-14 bg-slate-200'>
        <h1 className='text-3xl text-center text-orange-600 font-semibold mt-10'>
          {tournamentData?.t_name} Tournament
        </h1>
        <p className='text-md text-center text-orange-600 font-normal'>
          Register Your Team Right Now!
        </p>
        <form className="flex flex-col items-center p-10 gap-6">
          <div className="flex flex-col gap-4">
            {/* Team Details */}
            <Input
              required={true}
              name="team_name"
              id="team name"
              type="text"
              label="Team Name"
              placeholder="Enter Team Name"
              className="w-[80vh]"
              onChange={(e) => setTeamName(e.target.value)}
            />
            {error.team_name && (
              <span className="text-red-500 text-md">
                {error.team_name}
              </span>
            )}
            <Input
              required={true}
              name="coach_name"
              id="team coach"
              type="text"
              label="Team Coach"
              placeholder="Enter Coach Name"
              className="w-[80vh]"
              onChange={(e) => setCoachName(e.target.value)}
            />
            {error.coach_name && (
              <span className="text-red-500 text-md">
                {error.coach_name}
              </span>
            )}

            <Input
              required={true}
              name="email"
              id="email"
              type="text"
              label="Email"
              placeholder="Enter your email"
              className="w-[80vh]"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <span className="text-red-500 text-md">
                {error.email}
              </span>
            )}

            <Input
              required={true}
              name="phone_number"
              id="phone number"
              type="text"
              label="Phone Number"
              placeholder="Enter Your Team's Phone Number"
              className="w-[80vh]"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error.phone_number && (
              <span className="text-red-500 text-md">
                {error.phone_number}
              </span>
            )}

            <Input
              required={true}
              name="address"
              id="Address"
              type="text"
              label="Address"
              placeholder="Enter Your Team's Address"
              className="w-[80vh]"
              onChange={(e) => setAddress(e.target.value)}
            />
            {error.address && (
              <span className="text-red-500 text-md">
                {error.address}
              </span>
            )}

            {/* Team Logo */}
            <DragDropFile
              required={true}
              setFile={setImages}
              setNewImages={setImages}
              label="Team Logo"
              name="team_logo"
              accepts="image/png, image/jpeg, image/jpg"
              multiple={false}
              buttonLabel="Upload Logo"
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
            {error.team_logo && (
              <span className="text-red-500 text-md">
                {error.team_logo}
              </span>
            )}

            {/* Player List */}
            <div className="flex w-full gap-8">
              <div className="w-full">
                {playerList.map((player, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-end">
                      <Input
                        required={true}
                        name="player_name"
                        type="text"
                        label={`Player ${index + 1} Name`}
                        placeholder={`Player ${index + 1} Name`}
                        value={player.playerName}
                        onChange={(e) => handlePlayerChange(index, "playerName", e.target.value)}  // Update name field
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    {error[`players.${index}.player_name`] && (
                      <span className="text-red-500 text-sm">
                        {error[`players.${index}.player_name`][0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full">
                {playerList.map((player, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-start">
                      <Input
                        required={true}
                        name="player_email"
                        type="text"
                        label={`Player ${index + 1} Email`}
                        placeholder={`Player ${index + 1} Email`}
                        value={player.playerEmail}
                        onChange={(e) => handlePlayerChange(index, "playerEmail", e.target.value)}  // Update email field
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                      {playerList.length > tournamentData.min_players_per_team && (
                        <button
                          type="button"
                          onClick={() => removePlayer(index)}
                          className="bg-red-600 px-2 py-2 rounded-lg text-white font-medium ms-2"
                        >
                          <ImCross />
                        </button>
                      )}
                    </div>
                    {error[`players.${index}.player_email`] && (
                      <span className="text-red-500 text-sm">
                        {error[`players.${index}.player_email`][0]}
                      </span>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* Add Player Button */}
            {playerList.length < tournamentData.max_players_per_team && (
              <button
                type="button"
                onClick={addPlayer}
                className="bg-blue-500 p-2.5 rounded-lg text-white font-medium self-start"
              >
                Add Player
              </button>
            )}
            <button type="submit" onClick={handleSubmit} className="bg-green-600 flex self-end text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
