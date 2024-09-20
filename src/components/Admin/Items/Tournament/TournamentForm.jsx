// TournamentForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import SelectField from "../../../Tournaments/SelectField";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DragDropFile from "../../../DragDrop/DragDropFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TournamentForm() {
  const [tournamentName, setTournamentName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [logo, setLogo] = useState([]);
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [prizePool, setPrizePool] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [registrationStartingDate, setRegistrationStartingDate] = useState("");
  const [registrationEndingDate, setRegistrationEndingDate] = useState("");
  const [status, setStatus] = useState(1); // default to Active
  const [featured, setFeatured] = useState(1); // default to Featured

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

  useEffect(() => {
    if (tournamentId) {
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
            setNumberOfTeams(data.tournament.team_number || "");
            setPrizePool(data.tournament.prize_pool || 0);
            setPhoneNumber(data.tournament.phone_number || "");
            setEmail(data.tournament.email || "");
            setAddress(data.tournament.address || "");
            setRegistrationStartingDate(data.tournament.rs_date || "");
            setRegistrationEndingDate(data.tournament.re_date || "");
            setStatus(data.tournament.status || 1); // assuming default is Active
            setFeatured(data.tournament.featured || 1);
            setLogo(data.tournament.t_logo ? [data.tournament.t_logo] : []);
          } else {
            console.error("Tournament data not found");
          }
        } catch (error) {
          console.error("Error fetching tournament data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTournamentData();
    } else {
      // Reset state for adding new tournament
      setLoading(false);
    }
  }, [tournamentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("t_name", tournamentName || "");
    formData.append("t_description", tournamentDescription || "");
    formData.append("ts_date", startingDate || "");
    formData.append("te_date", endingDate || "");
    if (logo.length) {
      logo.forEach((file) => formData.append("t_logo[]", file));
    }
    formData.append("team_number", numberOfTeams || 0);
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

  console.log(logo);

  return (
    <div>
      <h2>{tournamentId ? "Edit Tournament" : "Add Tournament"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-8 shadow-2xl">
          <div className="flex flex-col gap-4">
            <FormInput
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

            <FormInput
              required={true}
              name="t_description"
              id="description"
              type="text"
              label="Description"
              placeholder="Description"
              value={tournamentDescription}
              onChange={(e) => setTournamentDescription(e.target.value)}
            />
            {error.t_description && (
              <span className="text-red-500 text-md">
                {error.t_description}
              </span>
            )}

            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <FormInput
                  required={true}
                  name="ts_date"
                  id="starting"
                  type="date"
                  label="Starting Date"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                />
                {error.ts_date && (
                  <span className="text-red-500 text-md">{error.ts_date}</span>
                )}
              </div>

              <div className="w-6/12">
                <FormInput
                  required={true}
                  name="te_date"
                  id="ending"
                  type="date"
                  label="Ending Date"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                />
                {error.te_date && (
                  <span className="text-red-500 text-md">{error.te_date}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-6/12">
                <FormInput
                  required={true}
                  name="rs_date"
                  id="registration-starting"
                  type="date"
                  label="Registration Starting Date"
                  value={registrationStartingDate}
                  onChange={(e) => setRegistrationStartingDate(e.target.value)}
                />
                {error.rs_date && (
                  <span className="text-red-500 text-md">{error.rs_date}</span>
                )}
              </div>

              <div className="w-6/12">
                <FormInput
                  required={true}
                  name="re_date"
                  id="registration-ending"
                  type="date"
                  label="Registration Ending Date"
                  value={registrationEndingDate}
                  onChange={(e) => setRegistrationEndingDate(e.target.value)}
                />
                {error.re_date && (
                  <span className="text-red-500 text-md">{error.re_date}</span>
                )}
              </div>
            </div>

            {/* <FormInput
              required={false}
              name="t_logo"
              id="logo"
              type="file"
              accept="image/*"
              label="Logo"
              onChange={(e) => setLogo(e.target.files[0])}
            /> */}

            <DragDropFile
              name="t_logo"
              setFile={(files) => setLogo(Array.from(files))}
              accepts="image/png, image/jpeg, image/jpg"
            />
            {/* show image */}

            {Array.isArray(logo) && logo.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {logo.map((file, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", margin: "10px" , display: "flex", justifyContent: "center", alignItems: "center"}}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLogo((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100"
                      style={{
                        position: "absolute",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: "30px",
                        height: "20px",
                        lineHeight: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="opacity-70 w-full h-full"/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {error.t_logo && (
              <span className="text-red-500 text-md">{error.t_logo}</span>
            )}

            <FormInput
              required={true}
              name="team_number"
              id="numberOfTeams"
              type="number"
              label="Number Of Teams"
              placeholder="Number Of Teams"
              value={numberOfTeams}
              min="0"
              onChange={(e) => setNumberOfTeams(e.target.value)}
            />
            {error.team_number && (
              <span className="text-red-500 text-md">{error.team_number}</span>
            )}

            <FormInput
              required={true}
              name="prize_pool"
              id="prize_pool"
              type="text"
              label="Prize Pool"
              placeholder="Prize Pool"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
            />
            {error.prize_pool && (
              <span className="text-red-500 text-md">{error.prize_pool}</span>
            )}

            <FormInput
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

            <FormInput
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

            <FormInput
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
                  value={status}
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
                  value={featured}
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
