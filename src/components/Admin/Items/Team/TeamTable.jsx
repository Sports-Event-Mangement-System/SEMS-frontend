import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import LoaderSpinner from "../../../../Spinner/LoaderSpinner";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Ui/Modal/Modal";
import RollingBall from "../../../Ui/RollingBall/RollingBall";
import DeleteModal from "../../../Ui/Modal/DeleteModal";
import PageHeader from '../../../Ui/Header/PageHeader';
export default function TeamTable() {
  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Team', link: '/admin/team' },
  ];

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const [groupedTeams, setGroupedTeams] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const [showTeam, setShowTeam] = useState([]);

  const navigate = useNavigate();

  // Fetch all teams from the API and group them by tournament
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/teams`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLoading(false);
      setTeams(response.data.data);
      groupTeamsByTournament(response.data.data);
    } catch (err) {
      toast.error("Error fetching teams");
    }
  };

  // Group teams by tournament
  const groupTeamsByTournament = (teams) => {
    const grouped = teams.reduce((acc, team) => {
      const tournamentId = team.tournament_id;
      if (!acc[tournamentId]) {
        acc[tournamentId] = {
          tournament: team.tournament,
          teams: [],
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

  // Toggle the collapse/expand state of a tournament
  const toggleGroup = (tournamentId) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [tournamentId]: !prev[tournamentId],
    }));
  };

  // Toggle the status of a team
  const toggleStatus = async (id, currentStatus, tournamentId, index) => {
    // Clone the groupedTeams state to avoid mutating the original state
    const updatedGroupedTeams = { ...groupedTeams };

    // Set loading state for the specific team
    updatedGroupedTeams[tournamentId].teams[index].isLoading = true;
    setGroupedTeams(updatedGroupedTeams);
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
      if (response.data.status === true) {
        updatedGroupedTeams[tournamentId].teams[index].status = newStatus;
        updatedGroupedTeams[tournamentId].teams[index].isLoading = false;

        // Update the state with the new groupedTeams
        setGroupedTeams(updatedGroupedTeams);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Error updating Team status");

      // Reset loading state in case of an error
      updatedGroupedTeams[tournamentId].teams[index].isLoading = false;
      setGroupedTeams(updatedGroupedTeams);
    }
  };

  // Show team details in a modal
  const showTeamDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/show/team/${id}`
      );
      setShowTeam(response.data.team);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  // Navigate to edit team form
  const handleEdit = (id) => {
    navigate(`/admin/editTeamForm/${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Delete a team and confirm in modal
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
        `${import.meta.env.VITE_API_URL}api/delete/team/${teamToDelete}`,
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
  };

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

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Team Table"
        breadcrumbItems={breadcrumbs}
      />
      {showDeleteModal && (
        <DeleteModal closeModal={closeDeleteModal} deleteRow={deleteTeam} />
      )}
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
            {Object.entries(groupedTeams).map(
              ([tournamentId, { tournament, teams }]) => (
                <React.Fragment key={tournamentId}>
                  <tr
                    className="cursor-pointer bg-orange-100 dark:bg-orange-300 hover:bg-orange-200"
                    onClick={() => toggleGroup(tournamentId)}
                  >
                    <td colSpan="7" className="px-6 py-3 font-bold">
                      {tournament.t_name} ({teams.length} teams)
                      {collapsedGroups[tournamentId] ? (
                        <MdExpandMore className="inline ml-2" />
                      ) : (
                        <MdExpandLess className="inline ml-2" />
                      )}
                    </td>
                  </tr>
                  {!collapsedGroups[tournamentId] &&
                    teams.map((team, index) => (
                      <tr
                        key={team.id}
                        className="border dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
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
                            onClick={() =>
                              toggleStatus(
                                team.id,
                                team.status,
                                tournamentId,
                                index
                              )
                            }
                          />
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <button
                              className="flex justify-center bg-blue-600 text-white rounded-xl w-14 py-2 hover:bg-blue-500"
                              onClick={() => showTeamDetails(team.id)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center"
                              onClick={() => handleEdit(team.id)}
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center"
                              onClick={() => confirmDelete(team.id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              )
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal closeModal={closeModal}>
          <div className="font-bold text-2xl flex justify-center text-orange-600 underline mb-3">
            Team Details
          </div>
          <div className="overflow-y-auto max-h-[80vh]">
            {" "}
            {/* 80% of the viewport height */}
            {Object.entries(showTeam).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <div className="text-gray-700 w-full">
                  {key === "team_name" && (
                    <div className="team-modal">
                      <div className="team-key">Team Name:</div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                  {key === "coach_name" && (
                    <div className="team-modal">
                      <div className="team-key">Coach Name:</div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                  {key === "player_number" && (
                    <div className="team-modal">
                      <div className="team-key">Number of Player:</div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                  {key === "address" && (
                    <div className="team-modal">
                      <div className="team-key">Address:</div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                  {key === "email" && (
                    <div className="team-modal">
                      <div className="team-key">Email:</div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                  {key === "phone_number" && (
                    <div className="team-modal">
                      <div className="team-key">Phone Number: </div>
                      <div className="team-value">{value}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <table className="min-w-full table-auto border-collapse border border-orange-500 mt-3">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-800 border-b border-r border-orange-300 w-1/4">
                    S.N.
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-800 border-b border-l border-orange-300">
                    Player Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {showTeam.players &&
                  showTeam.players.map((player, index) => (
                    <tr key={player.id} className="hover:bg-orange-50">
                      <td className="px-4 py-2 text-sm text-gray-800 border-b border-r- border-orange-300 ">
                        {player.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 border-b border-l border-orange-300">
                        {player.player_name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
}
