import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";


export default function TeamTable() {
  const [teams, setTeams] = useState([]);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/teams`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data.data);
      setTeams(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchTeam();
  }, []);


  const [isLoading, setIsLoading] = useState(false);
  const toggleStatus = async (id, currentStatus) => {
     // Add a loading state
  
    if (isLoading) return; // Prevent multiple clicks
  
    try {
      setIsLoading(true); // Set loading to true when the request starts
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
        fetchTeam();
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating Team status");
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  };
  

  return (
    <>
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
            {teams.map((team, index) => (
              <tr key={index} className="text-start border dark:text-gray-200 dark:border-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium">
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
                  <button
                    className={`text-white rounded-xl w-20 py-1 ${
                      team.status === 1 ? "bg-green-600" : "bg-red-600"
                    }`}
                    onClick={() => toggleStatus(team.id, team.status)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : team.status === 1 ? "Active" : "Inactive"} {/* Show loading text */}
                  </button>
                </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white rounded-xl w-14 py-2 flex justify-center">
                        <MdEdit />
                      </button>
                      <button className="bg-red-500 text-white rounded-xl w-16 py-2 flex justify-center">
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
