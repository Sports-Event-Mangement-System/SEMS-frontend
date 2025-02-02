import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import Alert from "../../../Ui/AlertBox/alert";
import { toast } from "react-toastify";
import RoundRobinBracket from "./RoundRobinBracket";
import RollingBall from "../../../Ui/RollingBall/RollingBall";
import PageHeader from "../../../Ui/Header/PageHeader";
import DeleteModal from "../../../Ui/Modal/DeleteModal";
import { MdDelete } from "react-icons/md";

export default function TiesheetGenerator() {
  const [tournament, setTournament] = useState({});
  const [matches, setMatches] = useState([]);
  const [showTiesheet, setShowTiesheet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [randomTeams, setRandomTeams] = useState(false);
  const [createMatches, setCreateMatches] = useState(false);
  const [pointsTableData, setPointsTableData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { tournamentId } = useParams();
  const { width, height } = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  const [maxRounds, setMaxRounds] = useState([]);

  useEffect(() => {
    fetchTournamentData();
    getTiesheetResponse();
  }, [tournamentId]);


  // Fetch Tournament Data
  const fetchTournamentData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/show/tournament/${tournamentId}`
      );
      setTournament(response.data.tournament || {});
    } catch (err) {
      setError("Error fetching tournament data");
    }
  };

  // Fetch Tiesheet Response If there is in Database else the button generate will be shown
  const getTiesheetResponse = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/response/${tournamentId}`,
      );
      setMatches(response.data.matches || []);
      setShowTiesheet(response.data.showTiesheet || false);
      if (tournament.tournament_type = "round-robin") {
        setPointsTableData(response.data.points_table || []);
      }
      setMaxRounds(response.data.max_rounds);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Generate Tiesheet after clicking generate button
  const generateTiesheet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/tournament/${tournamentId}`,
        {
          params: {
            randomTeams: randomTeams
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMatches(response.data.matches || []);
      if (tournament.tournament_type === "round-robin") {
        setPointsTableData(response.data.points_table || []);
      }
      setCreateMatches(response.data.saveButton);
      setMaxRounds(response.data.max_rounds);
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error generating tiesheet");
    } finally {
      setLoading(false);
    }
  };

  // Save Matches in Database after clicking create matches button
  const saveMatches = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL
        }api/save/matches/tournament/${tournamentId}`,
        { pointsTableData, matches },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setCreateMatches(false);
      setShowTiesheet(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving matches");
    } finally {
      setLoading(false);
    }
  };

  // Delete Tiesheet and Matches in Database after clicking delete tiesheet button
  const deleteTiesheet = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}api/delete/tiesheet/${tournamentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMatches([]);
      setShowTiesheet(false);
      toast.success(response.data.message);
      closeDeleteModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting tiesheet");
    } finally {
      setLoading(false);
    }

  };

  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
    { label: 'Schedule', link: '/admin/schedule' },
    { label: 'Tiesheet Generator', link: `/admin/schedule/tiesheet-generator/${tournamentId}` },
  ];

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };  

  return (
    <>
      {showDeleteModal && (
          <DeleteModal closeModal={closeDeleteModal} deleteRow={deleteTiesheet} message="Are you sure you want to delete the tiesheet and matches for this tournament?" />
        )}
      <div className="flex flex-col">
        <PageHeader 
          title="Tiesheet Generator"

          breadcrumbItems={breadcrumbs}
        />
      </div>
      <div className="text-2xl font-semibold mb-4">
        Tournament: <span className="text-green-600 dark:text-green-600">{tournament.t_name}</span>
      </div>
      <Alert
        type="info"
        message="If your tournament does not have a completed registration date, then the matches displayed are just dummy data created according to the maximum number of teams in the tournament. Once registration is complete, the actual match data will be properly stored in the database."
      />

      {loading ? (
        <RollingBall size={100} centered={true} />
      ) : error ? (
        <span className="text-red-600">{error}</span>
      ) : (
        <>
          {tournament.tournament_type === "round-robin" && (
            <div className="text-sm text-blue-600">
              Note: This tournament format is round-robin, where each team
              plays against every other team.
            </div>
          )}
          {!showTiesheet && (
            <div className="flex items-center space-x-4">
              <button
                disabled={loading}
                onClick={generateTiesheet}
                className={`bg-green-600 text-white px-8 py-3 rounded-lg ${loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                  }`}
              >
                {matches.length > 0
                  ? "Generate Another Tiesheet"
                  : "Generate Tiesheet"}
              </button>

              {createMatches && (
                <button
                  disabled={loading}
                  onClick={saveMatches}
                  className={`bg-green-600 text-white px-8 py-3 rounded-lg ${loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-700"
                    }`}
                >
                  Create Matches in Database
                </button>
              )}
              { tournament.tournament_type === "single-elimination" && (
                <div className="flex items-center">
                  <input
                  type="checkbox"
                  checked={randomTeams}
                  onChange={(e) =>
                    setRandomTeams(e.target.checked ? true : false)
                  }
                  id="randomTeams"
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor="randomTeams" className="text-sm font-medium">
                  Randomize Teams
                  </label>
                </div>
              )}
            </div>
          )}

          {showTiesheet && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <MdDelete />
              Delete Tiesheet & Matches
            </button>
          )}
          {matches.length > 0 ? (
            tournament.tournament_type === "single-elimination" ? (
              <SingleEliminationBracket
                matches={matches}
                matchComponent={Match}
                svgWrapper={({ children, ...props }) => (
                  <SVGViewer width={finalWidth} height={finalHeight} {...props}>
                    {children}
                  </SVGViewer>
                )}
              />
            ) : (
              <RoundRobinBracket matches={matches} max_rounds={maxRounds} pointsTable={pointsTableData} />
            )
          ) : (
            <p>Click generate button to generate Tiesheet</p>
          )}
        </>
      )}
    </>
  );
}
