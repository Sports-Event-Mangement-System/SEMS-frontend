import React, { useState } from "react";
// import { SampleRounds } from "./SampleRounds";

const RoundRobinBracket = ({ matches }) => {
  console.log(matches);
  matches.map((match) => {
    console.log(match.participants);
  });

  return (
    <div>
      {/* Loop through each round and display its matches */}
      <div className="mt-4">
        <div className="flex gap-8">
          {/* Fixture Table */}
          <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-500 text-white border">
              <tr>
                <th className="px-6 py-3 text-base font-extrabold">
                  Match Fixture
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, matchIndex) => (
                <tr
                  key={match.id}
                  className={
                    matchIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
                  } // Alternate row colors
                >
                  <td className="px-6 py-4 border w-1/3">
                    {match.time || "TBD"}
                  </td>{" "}
                  {/* Display the match time */}
                  <td className="px-6 py-4 border w-3/4">
                    {match.participants.map((participant, index) => (
                      <span key={participant.id}>
                        {participant.name}
                        {index < match.participants.length - 1 ? " vs " : ""}
                      </span>
                    ))}
                  </td>{" "}
                  {/* Display the teams */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Score Table */}
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
        </div>
      </div>
    </div>
  );
};

export default RoundRobinBracket;
