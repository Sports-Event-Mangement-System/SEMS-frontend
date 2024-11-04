import React from "react";

export default function PointsTable({ matches }) {
  return (
      <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3 text-base font-extrabold" colSpan={7}>
              Points Table
            </th>
          </tr>
          <tr className="bg-green-500 text-white">
            <th className="px-6 py-3 border">SN</th>
            <th className="px-6 py-3 border">Team</th>
            <th className="px-6 py-3 border">MP</th>
            <th className="px-6 py-3 border">W</th>
            <th className="px-6 py-3 border">D</th>
            <th className="px-6 py-3 border">L</th>
            <th className="px-6 py-3 border">PTS</th>
          </tr>
        </thead>
        <tbody>
          {/* Create a Set to keep track of displayed teams */}
          {Array.from(
            new Set(
              matches.flatMap((match) =>
                match.participants.map((participant) => participant.name)
              )
            )
          ).map((teamName, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-green-100" : "bg-green-50"}
            >
              <td className="px-6 py-4 border">{index + 1}.</td>
              <td className="px-6 py-4 border">{teamName}</td>
              <td className="px-6 py-4 border"></td>
              <td className="px-6 py-4 border"></td>
              <td className="px-6 py-4 border"></td>
              <td className="px-6 py-4 border"></td>
              <td className="px-6 py-4 border"></td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}
