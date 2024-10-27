import React from "react";

const RoundRobinBracket = ({ matches }) => {
  // Group matches by round
  const rounds = {};

  // Organize matches by round
  matches.forEach((match) => {
    const round = match.round || "Round 1"; // Default to "Round 1"
    if (!rounds[round]) {
      rounds[round] = [];
    }
    rounds[round].push(match);
  });

  return (
    <div>
      {/* Loop through each round and display its matches */}
      {Object.entries(rounds).map(([round, matches]) => (
        <div key={round}>
          <div className="flex gap-8">
            {/* Fixture Table */}
            <table className="w-full text-sm text-left mb-4 border border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                <tr>
                  <th className="px-6 py-3 text-base font-extrabold">Match Fixture</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.id} className="border">
                    <td className="border w-1/3">{match.time || 'TBD'}</td> {/* Display the match time */}
                    <td className="border w-3/4">{match.teamA} vs {match.teamB}</td> {/* Display the teams */}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Score Table */}
            <table className="w-full text-sm text-left mb-4 border border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                <tr>
                  <th className="px-6 py-3 border text-base font-extrabold" colSpan={6}>Points Table</th>
                </tr>
                <tr>
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
                {matches.map((match) => (
                    <tr key={match.id}>
                      <td className="px-6 py-4 border">{match.id}</td> {/* Serial number */}
                      <td className="px-6 py-4 border">{match.teamA}</td>
                      <td className="px-6 py-4 border">{match.mathcedPlayed}</td>
                      <td className="px-6 py-4 border">{match.winsA}</td>
                      <td className="px-6 py-4 border">{match.drawsA}</td>
                      <td className="px-6 py-4 border">{match.lossesA}</td>
                      <td className="px-6 py-4 border">{match.pointsA}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoundRobinBracket;
