// EditTeamForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../../Ui/FormInput/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DragDropFile from "../../../Ui/DragDrop/DragDropFile";
import { ImCross } from "react-icons/im";

export default function EditTeamForm() {
  const { teamId } = useParams();
  const [tournament, setTournament] = useState("");
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState([]);
  const [players, setPlayers] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [playerList, setPlayerList] = useState([]);

  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    if (teamId) {
      if (isDataFetched) return;
      // Fetch tournament data for editing
      const fetchTeamData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL
            }api/show/team/${teamId}`,
          );
          const data = response.data;
          if (data && data.team) {
            setTournament(data.team.tournament || "");
            setTeamName(data.team.team_name || "");
            setCoachName(data.team.coach_name || "");
            setPhoneNumber(data.team.phone_number || "");
            setEmail(data.team.email || "");
            setAddress(data.team.address || "");
            setExistingImages(data.team.logo_urls ? [data.team.logo_urls] : []);
            setPlayers(data.team.players || "");
          } else {
            console.error("Team data not found");
          }
        } catch (error) {
          console.error("Error fetching tournament data", error);
        } finally {
          setLoading(false);
          setIsDataFetched(true);
        }
      };

      fetchTeamData();
    } else {
      // Reset state for adding new tournament
      setLoading(false);
    }
  }, [teamId, isDataFetched]);


  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index][field] = value;
    setPlayerList(updatedPlayers);
  };

  const addPlayer = () => {
    if (playerList.length < tournament.max_players_per_team) {
      setPlayerList([...playerList, { playerName: "", playerEmail: "" }]);
    }
  };

  const removePlayer = (index) => {
    if (playerList.length > tournament.min_players_per_team) {
      const updatedPlayers = playerList.filter((_, playerId) => playerId !== index);
      setPlayerList(updatedPlayers);
    }
  };

  // Use useEffect to update playerList when players array changes
  useEffect(() => {
    if (Array.isArray(players)) {
      const updatedPlayers = players.map((player) => ({
        playerId: player.id,
        playerName: player.player_name,
        playerEmail: player.player_email
      }));

      setPlayerList(updatedPlayers); // Update player list once when players change
    }
  }, [players]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tournament_id", tournament?.id || 0);
    formData.append("team_name", teamName || "");
    formData.append("coach_name", coachName || "");
    formData.append("phone_number", phoneNumber || "");
    formData.append("email", email || "");
    formData.append("address", address || "");
    if (newImages.length) {
      formData.append("team_logo", image[0]);
    }

    formData.append("existing_images", existingImages)
    formData.append("player_number", playerList.length);

    // Append players data
    playerList.forEach((player, index) => {
      formData.append(`players[${index}][player_id]`, player.playerId ? player.playerId : "");
      formData.append(`players[${index}][player_name]`, player.playerName);
      formData.append(`players[${index}][player_email]`, player.playerEmail);
    });


    axios
      .post(`${import.meta.env.VITE_API_URL}api/update/team/${teamId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/admin/teamManagement");
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
          {teamName} Team
        </h1>
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
              value={teamName}
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
              value={coachName}
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
              value={email}
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
              value={phoneNumber}
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
              value={address}
              placeholder="Enter Your Team's Address"
              className="w-[80vh]"
              onChange={(e) => setAddress(e.target.value)}
            />
            {error.address && (
              <span className="text-red-500 text-md">
                {error.address}
              </span>
            )}

            <DragDropFile
              setFile={setImage}
              label="Team Logo"
              accepts="image/png, image/jpeg, image/jpg"
              multiple={false}
              buttonLabel="Upload Logo"
              placeholder="Max file size: 5MB Supports JPG, JPEG, PNG"
              name="team_logo"
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              setNewImages={setNewImages}
            />
            {error.team_logo && (
              <span className="text-red-500 text-md">
                {error.team_logo}
              </span>
            )}
            <div className="flex w-full gap-8">
              <div className="w-full">
                {playerList.map((player, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-end">
                      <Input
                        name="player_id"
                        type="hidden"
                        value={player.playerId || ""}
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                      <Input
                        required={true}
                        name="player_name"
                        type="text"
                        label={`Player ${index + 1} Name`}
                        placeholder={`Player ${index + 1} Name`}
                        value={player.playerName}
                        onChange={(e) => handlePlayerChange(index, "playerName", e.target.value)}
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
              {/* Player List */}
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
                      {playerList.length > tournament.min_players_per_team && (
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
            {playerList.length < tournament.max_players_per_team && (
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
