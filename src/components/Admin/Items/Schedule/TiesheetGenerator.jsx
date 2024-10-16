import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWindowSize } from "@uidotdev/usehooks";
import Alert from '../../../Ui/AlertBox/alert';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';

export default function TiesheetGenerator() {
  const [tournament, setTournament] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showTiesheet, setShowTiesheet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tournamentId } = useParams();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [randomTeams, setRandomTeams] = useState();
  const [createMatches, setCreateMatches] = useState(false);

  const { width, height } = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);


  useEffect(() => {
    if (tournamentId) {
      if (isDataFetched) return;
      const fetchTournamentData = async () => {
        try {
          // console.log("API URL:", import.meta.env.VITE_API_URL);
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}api/show/tournament/${tournamentId}`,
          );
          console.log(response.data)
          setTournament(response.data.tournament || []);
        } catch (err) {
          setError("Error fetching Datas");
        } finally {
          setLoading(false);
          setIsDataFetched(true);
        }
      };
      fetchTournamentData();
    }
  }, [tournamentId, isDataFetched]);

  const generateTiesheet = async (randomTeams) => {
    setLoading(true);
    try {
      // console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/tournament/${tournamentId}`,
        {
          params: { randomTeams },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data)
      setMatches(response.data.matches || []);
      setCreateMatches(response.data.saveButton);
      toast.success(response.data.message);
      setShowTiesheet(true);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
      setIsDataFetched(true);
    }
  };

  const saveMatches = async (matches) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/save/matches/tournament/${tournamentId}`,
        matches,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
      setIsDataFetched(true);
    }
  };

  console.log('Matches:', matches);
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-black">Tiesheet Generator</h1>
      <h2 className="text-1xl font-semibold text-gray-800 dark:text-black">Tournament {tournament.t_name}</h2>
      <Alert type="info" message="If your tournament does not have a completed registration date, then the matches displayed are just dummy data created according to the maximum number of teams in the tournament. Once registration is complete, the actual match data will be properly stored in the database." >
      </Alert>
      <div className="flex items-center">
        <button
          disabled={loading}
          onClick={() => generateTiesheet(randomTeams)}
          className={`bg-green-600 flex items-center text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${loading ? 'cursor-not-allowed' : ''}`}
        >
          {matches.length > 0 ? 'Generate Another Tiesheet' : 'Generate Tiesheet'}
        </button>
        {createMatches &&
          <div className="flex items-center ml-4">
            <button
              disabled={loading}
              onClick={() => saveMatches({matches})}
              className={`bg-green-600 flex items-center text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${loading ? 'cursor-not-allowed' : ''}`}
            >
              Create Matches in Databases
            </button>
          </div>
        }
        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            checked={randomTeams}
            onChange={(e) => setRandomTeams(e.target.checked)}
            id="randomTeams"
            className="w-4 h-4 mr-2"
          />
          <label htmlFor="randomTeams" className="text-sm font-medium">Randomize Teams</label>
        </div>

      </div>
      {!loading && Array.isArray(matches) && matches.length > 0 ? (
        <SingleEliminationBracket
          matches={Array.isArray(matches) ? matches : [matches]}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={finalWidth} height={finalHeight} {...props}>
              {children}
            </SVGViewer>
          )}
        />
      ) : (
        <p>{loading ? <ClipLoader></ClipLoader> : error ? <span className='text-red-600'>{error}</span> : "Click generate button To generate Tiesheet "}</p>
      )}
    </>
  );
};