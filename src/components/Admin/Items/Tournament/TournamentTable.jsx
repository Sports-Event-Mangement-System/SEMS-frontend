// TournamentTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../../Ui/Modal/Modal";
import LoaderSpinner from "../../../../Spinner/LoaderSpinner";
import { dateFormatFrontend } from "../../../Helper/dateFormat";
import RollingBall from "../../../Ui/RollingBall/RollingBall";

export default function TournamentTable() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const navigate = useNavigate();

  const addNewTournament = () => {
    navigate(`/admin/addTournamentForm`);
  }

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tournaments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLoading(false);
      setTournaments(response.data.tournaments || []);
    } catch (err) {
      setError("Error fetching tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, [])


  if (loading) {
    return (
      <div className="relative min-h-[600px]">
        <RollingBall
          size={100}
          centered={true}
        />
      </div>
    );
  }

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
        `${import.meta.env.VITE_API_URL
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

  const toggleStatus = async (id, currentStatus, index) => {
    const updatedTournaments = [...tournaments];
    updatedTournaments[index].isLoading = true;
    setTournaments(updatedTournaments);

    try {
      const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/update-status/tournament/${id}`,
        {
          tournament_id: id,
          status: newStatus
        }, // Assuming the API expects a JSON body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.status) {
        fetchTournaments();
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Error updating tournament status");
      console.error("Error updating tournament status", err);
    }
    finally {
      updatedTournaments[index].isLoading = false;
      setTournaments(updatedTournaments);
    }

  };

  return (
    <>
      {!error && (
        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={addNewTournament}
        >
          Add Tournament
        </button>
      )}
      <div className="p-4 w-full shadow-2xl">
        {showDeleteModal && (
          <Modal closeModal={closeDeleteModal}>
            <div className='flex justify-center mb-12 mt-5'>
              <RiDeleteBin6Line size={80} color='rgb(255,140,0)' />
            </div>
            <div className="text-xl font-semibold flex justify-center">Are you sure?</div>
            <div className="text-lg font-medium text-gray-500 mt-3 flex justify-center">
              Are you sure want to delete this row from the table?
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
          </Modal>
        )}

        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 font-bold">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Tournament Name</th>
              <th className="px-6 py-3 text-start">Starting Date</th>
              <th className="px-6 py-3 text-start">Ending Date</th>
              <th className="px-6 py-3 text-start">Logo</th>
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
              <tr key={tournament.id} className="text-start border dark:text-gray-200 dark:border-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{tournament.t_name}</td>
                <td className="px-6 py-3">
                  {dateFormatFrontend(tournament.ts_date)}
                </td>
                <td className="px-6 py-3">
                  {dateFormatFrontend(tournament.te_date)}
                </td>
                <td className="px-6 py-3">
                  {tournament.t_images[0] ? (
                    <img
                      src={tournament.image_urls[0]}
                      alt={`${tournament.t_name} logo`}
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <span>No logo</span>

                  )}
                </td>
                <td className="px-6 py-3">
                  <LoaderSpinner
                    isLoading={tournament.isLoading}
                    status={tournament.status}
                    onClick={() => toggleStatus(tournament.id, tournament.status, index)}
                  />
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
