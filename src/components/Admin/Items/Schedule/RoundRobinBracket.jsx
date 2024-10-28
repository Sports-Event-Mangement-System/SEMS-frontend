// import React from "react";

// const RoundRobinBracket = ({ matches }) => {
//   // Group matches by round
//   const rounds = {};

//   // Organize matches by round
//   matches.forEach((match) => {
//     const round = match.round || "Round 1"; // Default to "Round 1"
//     if (!rounds[round]) {
//       rounds[round] = [];
//     }
//     rounds[round].push(match);
//   });

//   return (
//     <div>
//       {/* Loop through each round and display its matches */}
//       {Object.entries(rounds).map(([round, matches]) => (
//         <div key={round} className="mt-4">
//           <div className="flex gap-8">
//             {/* Fixture Table */}
//             <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
//               <thead className="bg-blue-500 text-white border">
//                 <tr>
//                   <th className="px-6 py-3 text-base font-extrabold">Match Fixture</th>
//                   <th className="px-6 py-3"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {matches.map((match, index) => (
//                   <tr
//                     key={match.id}
//                     className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"} // Alternate row colors
//                   >
//                     <td className="px-6 py-4 border w-1/3">{match.time || 'TBD'}</td> {/* Display the match time */}
//                     <td className="px-6 py-4 border w-3/4">{match.teamA} vs {match.teamB}</td> {/* Display the teams */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Score Table */}
//             <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-base font-extrabold" colSpan={7}>Points Table</th>
//                 </tr>
//                 <tr className="bg-green-500 text-white">
//                   <th className="px-6 py-3 border">SN</th>
//                   <th className="px-6 py-3 border">Team</th>
//                   <th className="px-6 py-3 border">MP</th>
//                   <th className="px-6 py-3 border">W</th>
//                   <th className="px-6 py-3 border">D</th>
//                   <th className="px-6 py-3 border">L</th>
//                   <th className="px-6 py-3 border">PTS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {matches.map((match, index) => (
//                   <tr key={match.id} className={index % 2 === 0 ? "bg-green-100" : "bg-green-50"}>
//                     <td className="px-6 py-4 border">{match.id}.</td> {/* Serial number */}
//                     <td className="px-6 py-4 border">{match.teamA}</td>
//                     <td className="px-6 py-4 border">{match.matchesPlayed}</td>
//                     <td className="px-6 py-4 border">{match.winsA}</td>
//                     <td className="px-6 py-4 border">{match.drawsA}</td>
//                     <td className="px-6 py-4 border">{match.lossesA}</td>
//                     <td className="px-6 py-4 border">{match.pointsA}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoundRobinBracket;






import React, { useState } from "react";
import { SampleRounds } from "./SampleRounds";

const RoundRobinBracket = () => {

  const [matches] = useState(SampleRounds[0].matches);
  const [teams] = useState(SampleRounds[0].teams);

  return (
    <div>
      {/* Loop through each round and display its matches */}
        <div className="mt-4">
          <div className="flex gap-8">
            {/* Fixture Table */}
            <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
              <thead className="bg-blue-500 text-white border">
                <tr>
                  <th className="px-6 py-3 text-base font-extrabold">Match Fixture</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                  {matches.map((match, matchIndex) => (
                    <tr
                    key={match.id}
                    className={matchIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-50"} // Alternate row colors
                  >
                    <td className="px-6 py-4 border w-1/3">{match.time || 'TBD'}</td> {/* Display the match time */}
                    <td className="px-6 py-4 border w-3/4">
                      {match.participants.map((participant, index) => (
                      <span key={participant.id}>
                        {participant.name}
                        {index < match.participants.length - 1 ? " vs " : ""}
                      </span>
                    ))}
                    </td> {/* Display the teams */}
                  </tr>
                  ))}
              </tbody>
            </table>

            {/* Score Table */}
            <table className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-base font-extrabold" colSpan={7}>Points Table</th>
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
                {teams.map((team, teamIndex) => (
                  <tr key={team.id} className={teamIndex % 2 === 0 ? "bg-green-100" : "bg-green-50"}>
                    <td className="px-6 py-4 border">{team.team_name}</td> {/* Serial number */}
                    <td className="px-6 py-4 border"></td>
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
