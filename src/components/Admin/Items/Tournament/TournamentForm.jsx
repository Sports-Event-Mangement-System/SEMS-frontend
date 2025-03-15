// TournamentForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../../Ui/FormInput/Input";
import SelectField from "../../../Ui/SelectField/SelectField";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DragDropFile from "../../../Ui/DragDrop/DragDropFile";
import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";
import {dateFormatBackend} from "../../../Helper/dateFormat";
import PageHeader from "../../../Ui/Header/PageHeader";

export default function TournamentForm() {
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
  const tournamentId = queryParams.get("tournamentId");

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
    if (tournamentId) {
      if (isDataFetched) return;
      // Fetch tournament data for editing
      const fetchTournamentData = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }api/edit/tournament/${tournamentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          const data = response.data;
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
            console.error("Tournament data not found");
          }
        } catch (error) {
          console.error("Error fetching tournament data", error);
        } finally {
          setLoading(false);
          setIsDataFetched(true);
        }
      };

      fetchTournamentData();
    } else {
      // Reset state for adding new tournament
      setLoading(false);
    }
  }, [tournamentId, isDataFetched]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("t_name", tournamentName || "");
    formData.append("t_description", tournamentDescription || "");
    formData.append("ts_date", dateFormatBackend(startingDate) || "");
    formData.append("te_date", dateFormatBackend(endingDate) || "");
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
    formData.append("rs_date", dateFormatBackend(registrationStartingDate) || "");
    formData.append("re_date", dateFormatBackend(registrationEndingDate) || "");
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
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const todayDate = new Date();
    const mm = String(todayDate.getMonth() + 1).padStart(2, "0");
    const dd = String(todayDate.getDate()).padStart(2, "0");
    const yyyy = todayDate.getFullYear();

    const currentDate = `${yyyy}-${mm}-${dd}`;

    setMinDate(currentDate);
  }, []);

  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Tournament', link: '/admin/tournamentManagement' },
    { label: tournamentId ? "Edit Tournament" : "Add Tournament", link: '#' },
  ];
  
  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title={tournamentId ? "Edit Tournament" : "Add Tournament"}
        breadcrumbItems={breadcrumbs}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-8 shadow-2xl">
          <div className="flex flex-col gap-4">
            <Input
              required={true}
              name="t_name"
              id="tournamentname"
              type="text"
              label="Tournament Name"
              placeholder="Tournament Name"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
            />
            {error.t_name && (
              <span className="text-red-500 text-md">{error.t_name}</span>
            )}

            <div>
              <label htmlFor="description">
                Description<span className="text-red-500 text-md">*</span>
              </label>
              <textarea
                placeholder="Description"
                name="t_description"
                id="description"
                label="Description"
                value={tournamentDescription}
                onChange={(e) => setTournamentDescription(e.target.value)}
                className="h-24 w-full border rounded-lg px-3 py-2 focus:outline-orange-400 "
              ></textarea>
              {error.t_description && (
                <span className="text-red-500 text-md">
                  {error.t_description}
                </span>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <label htmlFor="starting">
                  Starting Date<span className="text-red-500 text-md">*</span>
                </label>
                <Flatpickr
                  required={true}
                  name="ts_date"
                  id="starting"
                  value={startingDate}
                  options={{
                    minDate: tournamentId ? null : minDate,
                    dateFormat: "Y-m-d",
                  }}
                   // Format date for Flatpickr
                  onChange={(date) => setStartingDate(date[0])} // Update state on change
                  className="h-12 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                />
                {error.ts_date && (
                  <span className="text-red-500 text-md">{error.ts_date}</span>
                )}
              </div>

              <div className="w-6/12">
              <label htmlFor="ending">
                Ending Date <span className="text-red-500 text-md">*</span>
              </label>
                <Flatpickr
                  required={true}
                  name="te_date"
                  id="ending"
                  type="date"
                  value={endingDate}
                  options={{
                    minDate: tournamentId ? null : minDate,
                    dateFormat: "Y-m-d"
                  }}
                  onChange={(date) => setEndingDate(dateFormatBackend(date[0]))}
                  className="h-12 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                />
                {error.te_date && (
                  <span className="text-red-500 text-md">{error.te_date}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-6/12">
              <label htmlFor="registration-starting">
                Registration Strating Date <span className="text-red-500 text-md">*</span>
              </label>
                <Flatpickr
                  required={true}
                  name="rs_date"
                  id="registration-starting"
                  type="date"
                  value={registrationStartingDate}
                  options={{
                    minDate: tournamentId ? null : minDate,
                    dateFormat: "Y-m-d"
                  }}
                  onChange={(date) => setRegistrationStartingDate(dateFormatBackend(date[0]))}
                  className="h-12 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                />
                {error.rs_date && (
                  <span className="text-red-500 text-md">{error.rs_date}</span>
                )}
              </div>

              <div className="w-6/12">
              <label htmlFor="registration-ending">
                Registration Ending Date <span className="text-red-500 text-md">*</span>
              </label>
                <Flatpickr
                  required={true}
                  name="re_date"
                  id="registration-ending"
                  type="date"
                  value={registrationEndingDate}
                  options={{
                    minDate: tournamentId ? null : minDate,
                    dateFormat: "Y-m-d"
                  }}
                  onChange={(date) => setRegistrationEndingDate(dateFormatBackend(date[0]))}
                  className="h-12 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
                />
                {error.re_date && (
                  <span className="text-red-500 text-md">{error.re_date}</span>
                )}
              </div>
            </div>

            <DragDropFile
              setFile={setImages}
              label="Tournament Images"
              accepts="image/png, image/jpeg, image/jpg"
              multiple={true}
              buttonLabel="Select Images"
              placeholder="Max file size: 5MB Supports JPG, JPEG, PNG"
              name="t_images"
              existingImages={existingImages}
              setExistingImages={setExistingImages}
              setNewImages={setNewImages}
            />
            {error.t_images && (
              <span className="text-red-500 text-md">{error.t_images}</span>
            )}
            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <Input
                  required={true}
                  name="max_teams"
                  id="max_teams"
                  type="number"
                  label="Maximum Teams"
                  placeholder="Maximum Teams"
                  value={maxTeams}
                  onChange={(e) => setMaxTeams(e.target.value)}
                />
                {error.max_teams && (
                  <span className="text-red-500 text-md">
                    {error.max_teams}
                  </span>
                )}
              </div>
              <div className="w-6/12">
                <Input
                  required={true}
                  name="min_teams"
                  id="min_teams"
                  type="number"
                  label="Minimum Teams"
                  placeholder="Minimum Teams"
                  value={minTeams}
                  onChange={(e) => setMinTeams(e.target.value)}
                />
                {error.min_teams && (
                  <span className="text-red-500 text-md">
                    {error.min_teams}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <Input
                  required={true}
                  name="max_players_per_team"
                  id="max_players_per_team"
                  type="number"
                  label="Maximum Players Per Team"
                  placeholder="Maximum Players"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                />
                {error.max_players_per_team && (
                  <span className="text-red-500 text-md">
                    {error.max_players_per_team}
                  </span>
                )}
              </div>
              <div className="w-6/12">
                <Input
                  required={true}
                  name="min_players_per_team"
                  id="min_players_per_team"
                  type="number"
                  label="Minimum Players Per Team"
                  placeholder="Minimum Players"
                  value={minPlayers}
                  onChange={(e) => setMinPlayers(e.target.value)}
                />
                {error.min_players_per_team && (
                  <span className="text-red-500 text-md">
                    {error.min_players_per_team}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <Input
                  required={true}
                  name="prize_pool"
                  id="prize_pool"
                  type="number"
                  label="Prize Pool"
                  placeholder="Prize Pool"
                  value={prizePool}
                  min="0"
                  onChange={(e) => setPrizePool(e.target.value)}
                />
                {error.prize_pool && (
                  <span className="text-red-500 text-md">
                    {error.prize_pool}
                  </span>
                )}
              </div>

              <div className="w-6/12">
                <SelectField
                  required={true}
                  label="Tournament Type/Format"
                  placeholder="Select Tournament Type"
                  id="tournament_type"
                  name="tournament_type"
                  searchable={false}
                  options={tournamenTypeOption}
                  value={tournamenTypeOption.find(
                    (option) => option.value === tournamentType
                  )}
                  onChange={(selectedOption) =>
                    setTournamentType(selectedOption.value)
                  }
                />
                {error.tournament_type && (
                  <span className="text-red-500 text-md">
                    {error.tournament_type}
                  </span>
                )}
              </div>
            </div>
            <Input
              required={true}
              name="phone_number"
              id="phoneNumber"
              type="text"
              label="Phone Number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error.phone_number && (
              <span className="text-red-500 text-md">{error.phone_number}</span>
            )}

            <Input
              required={false}
              name="email"
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <span className="text-red-500 text-md">{error.email}</span>
            )}

            <Input
              required={true}
              name="address"
              id="address"
              type="text"
              label="Address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {error.address && (
              <span className="text-red-500 text-md">{error.address}</span>
            )}

            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <SelectField
                  required={true}
                  label="Status"
                  placeholder="Select Status"
                  id="status"
                  name="status"
                  searchable={false}
                  options={statusOption}
                  value={statusOption.find((option) => option.value === status)}
                  onChange={(selectedOption) => setStatus(selectedOption.value)}
                />
                {error.status && (
                  <span className="text-red-500 text-md">{error.status}</span>
                )}
              </div>

              <div className="w-6/12">
                <SelectField
                  required={true}
                  label="Featured"
                  placeholder="Select Featured"
                  id="featured"
                  name="featured"
                  searchable={false}
                  options={featureOption}
                  value={featureOption.find(
                    (option) => option.value === featured
                  )}
                  onChange={(selectedOption) =>
                    setFeatured(selectedOption.value)
                  }
                />
                {error.featured && (
                  <span className="text-red-500 text-md">{error.featured}</span>
                )}
              </div>
            </div>
          </div>
          <button className="bg-blue-600 flex self-end text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
