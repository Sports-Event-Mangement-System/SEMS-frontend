import React from "react";

export default function PointsTable({ pointsTable }) {

  const safePointsTable = Array.isArray(pointsTable) ? pointsTable : [];
  
  // Iterate through the teams to display their stats
  return (
    <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 text-base font-extrabold" colSpan={7}>
            Points Table
          </th>
        </tr>
        <tr className="bg-green-500 text-white">
          <th className="px-6 py-3 border w-1/12">SN</th>
          <th className="px-6 py-3 border w-6/12">Team</th>
          <th className="px-6 py-3 border">MP</th>
          <th className="px-6 py-3 border">W</th>
          <th className="px-6 py-3 border">L</th>
          <th className="px-6 py-3 border">PTS</th>
        </tr>
      </thead>
      <tbody>
      {safePointsTable.map((team, index) => (
          <tr key={team.id} className={index % 2 === 0 ? "bg-green-100" : "bg-green-50"}>
            <td className="px-6 py-4 border">{index + 1}.</td>
            <td className="px-6 py-4 border">
              <div className="flex items-center">
                <img
                  src={team.logo_url}
                  alt={`${team.name} logo`}
                  className="w-6 h-6 mr-2"
                />
                {team.name}
              </div>
            </td>
            <td className="px-6 py-4 border">{team.matches_played}</td>
            <td className="px-6 py-4 border">{team.matches_won}</td>
            <td className="px-6 py-4 border">{team.matches_lost}</td>
            <td className="px-6 py-4 border">{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
