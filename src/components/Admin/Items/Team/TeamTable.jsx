import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TeamTable() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
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

    fetchTeam();
  }, []);

  return (
    <>
      <div className="p-4 w-full shadow-2xl">
        <table className="table-auto w-full border-spacing-1 border border-gray-200">
          <thead className="text-gray-700 uppercase text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-start">S.N.</th>
              <th className="px-6 py-3 text-start">Team Name</th>
              <th className="px-6 py-3 text-start">Team Coach</th>
              <th className="px-6 py-3 text-start">Team Logo</th>
              <th className="px-6 py-3 text-start">Email</th>
              <th className="px-6 py-3 text-start">Phone Number</th>
              <th className="px-6 py-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {teams.map((team, index) => (
              <tr key={index} className="text-start">
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
                <td className="px-6 py-3">{team.phone_number}</td>
                <td className="px-6 py-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
