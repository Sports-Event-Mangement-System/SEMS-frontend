// EditForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditForm({ tournamentId, onClose, onUpdate }) {


  const [formData, setFormData] = useState({
    t_name: "",
    ts_date: "",
    te_date: "",
    logoUrl: "",
    team_number: "",
    status: "Active",
  });



  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/edit/tournament/${tournamentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        setFormData(response.data.tournament);
      } catch (error) {
        console.error("Error fetching tournament details", error);
      }
    };

    if (tournamentId) {
      fetchTournament();
    }
  }, [tournamentId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}api/update/tournament/${tournamentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      onUpdate(); // Notify parent to refresh the list
      onClose(); // Close the form
    } catch (error) {
      console.error("Error updating tournament", error);
    }
  };


  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Edit Tournament</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tournament Name</label>
            <input
              type="text"
              name="t_name"
              value={formData.t_name}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Starting Date</label>
            <input
              type="date"
              name="ts_date"
              value={formData.ts_date}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ending Date</label>
            <input
              type="date"
              name="te_date"
              value={formData.te_date}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number of Teams</label>
            <input
              type="number"
              name="team_number"
              value={formData.team_number}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 px-4"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white rounded py-2 px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
