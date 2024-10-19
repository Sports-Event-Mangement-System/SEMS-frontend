// TournamentTable.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdDelete, MdEdit, MdOutlineSchedule } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../../Ui/Modal/Modal";
import { TbTournament } from "react-icons/tb";

export default function ScheduleTable() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // console.log("API URL:", import.meta.env.VITE_API_URL);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/tournaments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response.data)
        setTournaments(response.data.tournaments || []);
      } catch (err) {
        setError("Error fetching Datas");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTournamentToDelete(null);
  };

  const confirmDelete = (id) => {
    setTournamentToDelete(id);
    setShowDeleteModal(true);
  };

  const tiesheetGenerator = (id) => {
    navigate(`/admin/tiesheetGenerator/${id}`);
  }

  const handleEdit = (id) => {
    navigate(`/admin/addTournamentForm?tournamentId=${id}`);
  };

  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 font-bold">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Tournament Name</th>
              <th className="px-6 py-3 text-start">Tournament Type</th>
              <th className="px-6 py-3 text-start">Team Registered</th>
              <th className="px-6 py-3 text-start">Tiesheet Generator</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {loading && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {tournaments.length === 0 && !loading && !error && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No tournaments available.
                </td>
              </tr>
            )}

            {tournaments.map((tournament, index) => (
              <tr key={tournament.id} className="text-start border dark:text-gray-200 dark:border-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{tournament.t_name}</td>
                <td className="px-6 py-3">
                  {tournament.tournament_type}
                </td>
                <td className="px-6 py-3">
                  {tournament.teams.length}
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center"
                      onClick={() => tiesheetGenerator(tournament.id)}
                    >
                      <TbTournament />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
