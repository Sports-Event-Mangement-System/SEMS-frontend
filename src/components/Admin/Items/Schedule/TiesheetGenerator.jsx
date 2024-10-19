import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWindowSize } from "@uidotdev/usehooks";
import Alert from '../../../Ui/AlertBox/alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';

export default function TiesheetGenerator() {
  const [tournament, setTournament] = useState({});
  const [matches, setMatches] = useState([]);
  const [showTiesheet, setShowTiesheet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomTeams, setRandomTeams] = useState(false);
  const [createMatches, setCreateMatches] = useState(false);

  const { tournamentId } = useParams();
  const { width, height } = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  useEffect(() => {
    fetchTournamentData();
    getTiesheetResponse();
  }, [tournamentId]);

  const fetchTournamentData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/show/tournament/${tournamentId}`);
      setTournament(response.data.tournament || {});
    } catch (err) {
      setError("Error fetching tournament data");
    }
  };

  const getTiesheetResponse = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/response/${tournamentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMatches(response.data.data || []);
      setShowTiesheet(response.data.showTiesheet || false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching tiesheet");
    } finally {
      setLoading(false);
    }
  };

  const generateTiesheet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/tournament/${tournamentId}`,
        {
          params: { randomTeams },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMatches(response.data.matches || []);
      setCreateMatches(response.data.saveButton);
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error generating tiesheet");
    } finally {
      setLoading(false);
    }
  };

  const saveMatches = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/save/matches/tournament/${tournamentId}`,
        { matches },
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
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting tiesheet");
    }finally{
      setLoading(false);
    }
  };
  console.log(matches);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-black">Tiesheet Generator</h1>
      <h2 className="text-1xl font-semibold text-gray-800 dark:text-black">Tournament {tournament.t_name}</h2>
      <Alert type="info" message="If your tournament does not have a completed registration date, then the matches displayed are just dummy data created according to the maximum number of teams in the tournament. Once registration is complete, the actual match data will be properly stored in the database." />
      
      {loading ? (
        <ClipLoader />
      ) : error ? (
        <span className='text-red-600'>{error}</span>
      ) : (
        <>
          {!showTiesheet && (
            <div className="flex items-center space-x-4">
              <button
                disabled={loading}
                onClick={generateTiesheet}
                className={`bg-green-600 text-white px-8 py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
              >
                {matches.length > 0 ? 'Generate Another Tiesheet' : 'Generate Tiesheet'}
              </button>
              
              {createMatches && (
                <button
                  disabled={loading}
                  onClick={saveMatches}
                  className={`bg-green-600 text-white px-8 py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  Create Matches in Database
                </button>
              )}
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={randomTeams}
                  onChange={(e) => setRandomTeams(e.target.checked ? true : false)}
                  id="randomTeams"
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor="randomTeams" className="text-sm font-medium">Randomize Teams</label>
              </div>
            </div>
          )}

          {showTiesheet && (
            <button
              onClick={deleteTiesheet}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
            >
              Delete Tiesheet & Matches
            </button>
          )}

          {matches.length > 0 ? (
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
            <p>Click generate button to generate Tiesheet</p>
          )}
        </>
      )}
    </>
  );
}