import React, { useState } from "react";
import FormInput from "./FormInput";
import SelectField from "../../../Tournaments/SelectField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function TournamentForm() {
  const [tournamentName, setTournamentName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [logo, setLogo] = useState(undefined);
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [prizePool, setPrizePool] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState('')

  const [error, setError] = useState('')

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}api/store/tournaments`, {
        t_name: e.target.elements.t_name.value,
        t_description: e.target.elements.t_description.value,
        ts_date: e.target.elements.ts_date.value,
        te_date: e.target.elements.te_date.value,
        rs_date: e.target.elements.rs_date.value,
        re_date: e.target.elements.re_date.value,
        t_logo: e.target.elements.t_logo.files[0],
        team_number: e.target.elements.team_number.value,
        prize_pool: e.target.elements.prize_pool.value,
        email: e.target.elements.email.value,
        phone_number: e.target.elements.phone_number.value,
        status: e.target.elements.status.value,
        featured: e.target.elements.featured.value,
        address: e.target.elements.address.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data", 
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          navigate('/admin/tournamentManagement')
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
         console.log(err)
        if (err.message === "Network Error") {
          setError({ message: err.message })
          console.log(err)
        }
        else {
          setError(err.response.data.errors);
        }
      });

  };

  const statusOption = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const featureOption = [
    { value: 1, label: "Featured" },
    { value: 0, label: "Not Featured" },
  ];

  return (
    <>
      <div>Add form</div>
      <form action="" onSubmit={handleSubmit}>
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
              <span className="text-red-500 text-md">{error.t_description}</span>
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
                  id="registration starting"
                  type="date"
                  label="Registration Starting Date"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                />
                {error.rs_date && (
              <span className="text-red-500 text-md">{error.rs_date}</span>
            )}
              </div>

              <div className="w-6/12">
                <FormInput
                  required={true}
                  name="re_date"
                  id="ending"
                  type="date"
                  label="Registration Ending Date"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                />
                {error.re_date && (
              <span className="text-red-500 text-md">{error.re_date}</span>
            )}
              </div>
            </div>

            <FormInput
              required={true}
              name="t_logo"
              id="logo"
              type="file"
              accept="image/*"
              label="Logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
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
              min='0'
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
                  Searchable={false}
                  options={statusOption}
                />
                {error.status && (
              <span className="text-red-500 text-md">{error.status}</span>
            )}
              </div>

              <div className="w-6/12">
                <SelectField
                  required={true}
                  label="Featured"
                  placeholder="Selct Featured"
                  id="featured"
                  name="featured"
                  Searchable={false}
                  options={featureOption}
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
    </>
  );
}
