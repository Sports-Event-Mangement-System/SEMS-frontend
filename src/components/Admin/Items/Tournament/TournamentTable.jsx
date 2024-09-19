// TournamentTable.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TournamentTable() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/tournaments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTournaments(response.data.tournaments || []);
      } catch (err) {
        setError("Error fetching tournaments");
        console.error("Error fetching tournaments", err);
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

  const deleteTournament = async () => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }api/delete/tournament/${tournamentToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTournaments(tournaments.filter(t => t.id !== tournamentToDelete));
      closeDeleteModal();
      if (response.data.status) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Error deleting tournament");
      console.error("Error deleting tournament", err);
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/addTournamentForm?tournamentId=${id}`);
  };

  const addNewTournament = () => {
      navigate(`/admin/addTournamentForm`);
  }

  return (
    <>
      <div>
        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={addNewTournament}
        >
          Add
        </button>
      </div>
      <div className="p-4 w-full shadow-2xl">
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-100 h-fit w-fit px-32 py-10 rounded-lg shadow-lg">
              <div className="flex justify-center mb-12 mt-5">
                <RiDeleteBin6Line size={80} color="rgb(255,140,0)" />
              </div>
              <div className="text-xl font-semibold flex justify-center">
                Are you sure?
              </div>
              <div className="text-lg font-medium text-gray-500 mt-3 flex justify-center">
                Are you sure you want to delete this row from the table?
              </div>
              <div className="flex justify-center mt-4 gap-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                  onClick={deleteTournament}
                >
                  Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Tournament Name</th>
              <th className="px-6 py-3 text-start">Starting Date</th>
              <th className="px-6 py-3 text-start">Ending Date</th>
              <th className="px-6 py-3 text-start">Logo</th>
              <th className="px-6 py-3 text-start">Number of Teams</th>
              <th className="px-6 py-3 text-start">Status</th>
              <th className="px-6 py-3 text-start">Action</th>
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
              <tr key={tournament.id} className="text-start">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{tournament.t_name}</td>
                <td className="px-6 py-3">
                  {new Date(tournament.ts_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(tournament.te_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {tournament.logoUrl ? (
                    <img
                      src={tournament.logoUrl}
                      alt={`${tournament.t_name} logo`}
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <span>No logo</span>
                  )}
                </td>
                <td className="px-6 py-3">{tournament.team_number}</td>
                <td className="px-6 py-3">
                  <button
                    className={`text-white rounded-xl w-20 py-1 ${
                      tournament.status === 1 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {tournament.status === 1 ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center"
                      onClick={() => handleEdit(tournament.id)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center"
                      onClick={() => confirmDelete(tournament.id)}
                    >
                      <MdDelete />
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
