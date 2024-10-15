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

  const {width, height} = useWindowSize();
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

  const generateTiesheet = async () => {
    setLoading(true);
    try {
      // console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tiesheet/tournament/${tournamentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      console.log(response.data)
      setMatches(response.data.matches || []);
      toast.success(response.data.message);
      setShowTiesheet(true);
    } catch (err) {
      setError(err.response.data.message);
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
      <button 
        disabled={loading} 
        onClick={generateTiesheet} 
        className={`bg-green-600 flex self-end text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${loading ? 'cursor-not-allowed' : ''}`}
      >
        Generate Tiesheet
      </button>
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