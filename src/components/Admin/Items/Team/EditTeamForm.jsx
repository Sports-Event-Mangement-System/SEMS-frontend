// EditTeamForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../../Ui/Input";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DragDropFile from "../../../Ui/DragDrop/DragDropFile";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

export default function EditTeamForm() {
  const [tournamentName, setTournamentName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [images, setImages] = useState([]);
  const [minTeams, setMinTeams] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [prizePool, setPrizePool] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [registrationStartingDate, setRegistrationStartingDate] = useState("");
  const [registrationEndingDate, setRegistrationEndingDate] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]); // New state for new images

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("tournamentId");

  const statusOption = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const featureOption = [
    { value: 1, label: "Featured" },
    { value: 0, label: "Not Featured" },
  ];

  const tournamenTypeOption = [
    { value: "round-robin", label: "Round Robin" },
    { value: "single-elimination", label: "Single Elimination" },
  ];

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (teamId) {
      if (isDataFetched) return;
      // Fetch tournament data for editing
      const fetchTeamData = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }api/show/team/${teamId}`,
          );
          const data = response.data;
          console.log(data);
          if (data && data.tournament) {
            setTournamentName(data.tournament.t_name || "");
            setTournamentDescription(data.tournament.t_description || "");
            setStartingDate(data.tournament.ts_date || "");
            setEndingDate(data.tournament.te_date || "");
            setMaxTeams(data.tournament.max_teams || "");
            setMinTeams(data.tournament.min_teams || "");
            setMaxPlayers(data.tournament.max_players_per_team || "");
            setMinPlayers(data.tournament.min_players_per_team || "");
            setTournamentType(data.tournament.tournament_type || "");
            setPrizePool(data.tournament.prize_pool || 0);
            setPhoneNumber(data.tournament.phone_number || "");
            setEmail(data.tournament.email || "");
            setAddress(data.tournament.address || "");
            setRegistrationStartingDate(data.tournament.rs_date || "");
            setRegistrationEndingDate(data.tournament.re_date || "");
            setStatus(parseInt(data.tournament.status, 10) || 0);
            setFeatured(parseInt(data.tournament.featured, 10) || 0);
            setImages(
              data.tournament.t_images ? [data.tournament.t_images] : []
            );
            setExistingImages(data.tournament.image_urls || []);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("t_name", tournamentName || "");
    formData.append("t_description", tournamentDescription || "");
    formData.append("ts_date", startingDate || "");
    formData.append("te_date", endingDate || "");
    // Append new images (files selected by the user)
    if (newImages.length) {
      newImages.forEach((file) => formData.append("t_images[]", file));
    }

    // Append existing images as necessary
    existingImages.forEach((image) =>
      formData.append("existing_images[]", image)
    );
    formData.append("max_teams", maxTeams || 0);
    formData.append("min_teams", minTeams || 0);
    formData.append("max_players_per_team", maxPlayers || 0);
    formData.append("min_players_per_team", minPlayers || 0);
    formData.append("tournament_type", tournamentType || "");
    formData.append("prize_pool", prizePool || 0);
    formData.append("phone_number", phoneNumber || "");
    formData.append("email", email || "");
    formData.append("address", address || "");
    formData.append("rs_date", registrationStartingDate || "");
    formData.append("re_date", registrationEndingDate || "");
    formData.append("status", status);
    formData.append("featured", featured);

    const url = tournamentId
      ? `${import.meta.env.VITE_API_URL}api/update/tournament/${tournamentId}`
      : `${import.meta.env.VITE_API_URL}api/store/tournaments`;

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/admin/tournamentManagement");
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
              
            </div>


            <button type="submit" onClick={handleSubmit} className="bg-green-600 flex self-end text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
