import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSchedule, MdExpandMore, MdExpandLess } from "react-icons/md";

import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import LoaderSpinner from "../../../../Spinner/LoaderSpinner";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Ui/Modal/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TeamTable() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const [groupedTeams, setGroupedTeams] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/teams`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTeams(response.data.data);
      groupTeamsByTournament(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching teams");
    }
  };

  const groupTeamsByTournament = (teams) => {
    const grouped = teams.reduce((acc, team) => {
      const tournamentId = team.tournament_id;
      if (!acc[tournamentId]) {
        acc[tournamentId] = {
          tournament: team.tournament,
          teams: []
        };
      }
      acc[tournamentId].teams.push(team);
      return acc;
    }, {});
    setGroupedTeams(grouped);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const toggleGroup = (tournamentId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [tournamentId]: !prev[tournamentId]
    }));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const toggleStatus = async (id, currentStatus, index) => {
    const updatedTeams = [...teams];
    updatedTeams[index].isLoading = true;
    setTeams(updatedTeams);

    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/update-status/team/${id}`,
        {
          team_id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.status) {
        fetchTeams();
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating Team status");
    } finally {
      updatedTeams[index].isLoading = false;
      setTeams(updatedTeams);
    }
  };

  const showTeamDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/show/team/${id}`
      );
      console.log(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editTeamForm/${id}`);
  };


  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  const confirmDelete = (id) => {
    setTeamToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteTeam = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL
        }api/delete/team/${teamToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      fetchTeams();
      closeDeleteModal();
      if (response.data.status) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Error deleting team");
    }
  }
  return (
    <>
      {/* ... keep existing modal code ... */}
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 font-bold">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Team Name</th>
              <th className="px-6 py-3 text-start">Team Coach</th>
              <th className="px-6 py-3 text-start">Team Logo</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Status</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white hover:bg-gray-50">
            {Object.entries(groupedTeams).map(([tournamentId, { tournament, teams }]) => (
              <React.Fragment key={tournamentId}>
                <tr
                  className="cursor-pointer bg-orange-100 dark:bg-orange-300 hover:bg-orange-200"
                  onClick={() => toggleGroup(tournamentId)}
                >
                  <td colSpan="7" className="px-6 py-3 font-bold">
                    {tournament.t_name} ({teams.length} teams)
                    {collapsedGroups[tournamentId] ? <MdExpandMore className="inline ml-2" /> : <MdExpandLess className="inline ml-2" />}
                  </td>
                </tr>
                {!collapsedGroups[tournamentId] && teams.map((team, index) => (
                  <tr key={team.id} className="border dark:bg-gray-700 dark:hover:bg-gray-600">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{team.team_name}</td>
                    <td className="px-6 py-3">{team.coach_name}</td>
                    <td className="px-6 py-3">
                      <img
                        src={team.logo_urls}
                        alt={`${team.team_name} logo`}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="px-6 py-3">{team.email}</td>
                    <td className="px-6 py-3">
                      <LoaderSpinner
                        isLoading={team.isLoading}
                        status={team.status}
                        onClick={() => toggleStatus(team.id, team.status, index)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button className="flex justify-center bg-blue-600 text-white rounded-xl w-14 py-2 hover:bg-blue-500" onClick={() => showTeamDetails(team.id)}>
                          <FaEye />
                        </button>
                        <button className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center" onClick={() => handleEdit(team.id)}>
                          <MdEdit />
                        </button>
                        <button className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center"
                          onClick={() => confirmDelete(team.id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
