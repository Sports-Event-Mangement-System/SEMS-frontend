import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSchedule, MdExpandMore, MdExpandLess } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from '../../../Ui/Modal/Modal';
import MatchForm from "./MatchForm";
import Pagination from "../../../Ui/Pagination/Pagination";

export default function MatchTable() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTournaments = tournaments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tournaments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMatch(null);
  };

  const closeMatchModal = () => {
    setShowModal(false);
    setSelectedMatch(null);
  };

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tournament/matches`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTournaments(response.data.tournaments || []);
    } catch (err) {
      setError("Error fetching tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const toggleGroup = (tournamentId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [tournamentId]: !prev[tournamentId]
    }));
  };

  const fetchMatchDetails = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/match/details/${id}`);
      console.log(response.data.data)
      setSelectedMatch(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };
  const handleFormUpdate = () => {
    fetchTournaments();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(tournaments)
  return (
    <div className="p-4 w-full shadow-2xl">
      <table className="table-auto w-full border-spacing-1 border border-gray-200">
        <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 font-bold">
          <tr>
            <th className="px-6 py-3 text-start">S.N.</th>
            <th className="px-6 py-3 text-start">Team 1</th>
            <th className="px-6 py-3 text-start">Team 2</th>
            <th className="px-6 py-3 text-start">Match Winner</th>
            <th className="px-6 py-3 text-start">Round</th>
            <th className="px-6 py-3 text-start">Start Time</th>
            <th className="px-6 py-3 text-start">State</th>
            <th className="px-6 py-3 text-start">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          {currentTournaments.map((tournament, tournamentIndex) => (
            <React.Fragment key={tournament.id}>
              <tr
                className="group-header cursor-pointer bg-orange-100 dark:bg-orange-300 hover:bg-orange-100 dark:hover:bg-orange-200"
                onClick={() => toggleGroup(tournament.id)}
              >
                <td colSpan="8" className="px-6 py-3 font-bold">
                  <img src={tournament.image_url} alt="" className="w-10 h-10 rounded-full inline-block mr-2" /> {tournament.t_name} ({tournament.matches?.length || 0} matches) {collapsedGroups[tournament.id] ? <MdExpandMore className="inline ml-2" /> : <MdExpandLess className="inline ml-2" />}
                </td>
              </tr>
              {!collapsedGroups[tournament.id] && tournament.matches?.map((match, matchIndex) => (
                <tr key={match.id} className="text-start border dark:text-gray-200 dark:border-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 font-medium">
                  <td className="px-6 py-3">{tournamentIndex * 1000 + matchIndex + 1}</td>
                  <td className="px-6 py-3">
                    {match.participants && match.participants[0] ? (
                      <div className="flex items-center">
                        {match.participants[0].logo_url && (
                          <img src={match.participants[0].logo_url} alt="" className="w-10 h-10 rounded-full mr-2" />
                        )}
                        <span>{match.participants[0].name}</span>
                      </div>
                    ) : <div className="flex items-center justify-center">
                      <span>TBD</span>
                    </div>}
                  </td>
                  <td className="px-6 py-3">
                    {match.state === 'WALK_OVER' ? <div className="flex items-center justify-center">
                      <span>---</span>
                    </div> :
                      (match.participants && match.participants[1] ? (
                        <div className="flex items-center">
                          {match.participants[1].logo_url && (
                            <img src={match.participants[1].logo_url} alt="" className="w-10 h-10 rounded-full mr-2" />
                          )}
                          <span>{match.participants[1].name}</span>
                        </div>
                      ) : <div className="flex items-center justify-center">
                        <span>TBD</span>
                      </div>)}
                  </td>
                  <td className="px-6 py-3">
                    {match.participants && match.participants[0] ? (
                      match.participants.find(participant => participant.isWinner)?.name || "TBD"
                    ) : (
                      <span>TBD</span>
                    )}
                  </td>
                  <td className="px-6 py-3">{match.name}</td>
                  <td className="px-6 py-3">{match.startTime ? match.startTime : "Not Started"}</td>
                  <td className="px-6 py-3">{match.state}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white rounded-xl w-16 py-2 flex justify-center"
                        onClick={() => { fetchMatchDetails(match.id) }}
                      >
                        <MdOutlineSchedule />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showModal && (
        <Modal closeModal={closeMatchModal}>
          <MatchForm match={selectedMatch} closeModal={closeMatchModal} onFormUpdate={handleFormUpdate} />
        </Modal>
      )}
    </div>
  );
}