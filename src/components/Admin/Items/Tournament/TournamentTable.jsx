import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TournamentTable() {

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/tournaments`);
        const data = response.data.tournaments;
        console.log(data)

        if (Array.isArray(data)) {
          setTournaments(data);
        } else {
          setError("Unexpected data format from API");
        }
      } catch (error) {
        setError("Error fetching tournaments");
        console.error("Error fetching tournaments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = useCallback(async (id) => {
    try {
      // Replace 'your-auth-token' with the actual token or use a variable from context or state
      await axios.delete(`${import.meta.env.VITE_API_URL}api/delete/tournament/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        }
      });
      setTournaments(prevTournaments => prevTournaments.filter(tournament => tournament.id !== id));
    } catch (error) {
      setError(`Error deleting tournament: ${error.message}`);
      console.error("Error deleting tournament", error);
    }
  }, []);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (tournaments.length === 0) return <p>No tournaments available.</p>;



  return (
    <>
      <div className="p-4 w-full shadow-2xl">
      <table className="table-auto w-full">
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
          {tournaments.map((tournament, index) => (
            <tr key={tournament.id} className="text-start">
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">{tournament.t_name}</td>
              <td className="px-6 py-3">{new Date(tournament.ts_date).toLocaleDateString()}</td>
              <td className="px-6 py-3">{new Date(tournament.te_date).toLocaleDateString()}</td>
              <td className="px-6 py-3">
                <img src={tournament.logoUrl} alt={`${tournament.name} logo`} className="w-12 h-12 object-cover" />
              </td>
              <td className="px-6 py-3">{tournament.numberOfTeams}</td>
              <td className="px-6 py-3">
                <button
                  className={`bg-${tournament.status === 'Active' ? 'green' : 'red'}-600 text-white rounded-xl w-20 py-1`}
                >
                  {tournament.status}
                </button>
              </td>
              <td className="px-6 py-3">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center">
                    <MdEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center"
                    onClick={() => handleDelete(tournament.id)}
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
