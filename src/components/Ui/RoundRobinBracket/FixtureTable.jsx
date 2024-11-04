import React from "react";
import vsIcon from '/svg/versus-icon.svg';

export default function FixtureTable({ matches, max_rounds }) {
  // Log for debugging
  console.log("Max Rounds:", max_rounds);
  console.log("Matches:", matches);

  return (
    <div className="w-full text-sm text-left mb-4 border border-collapse rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white border">
        <div>
          <div className="px-6 py-3 text-base font-extrabold">
            Match Fixture
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        {Array.from({ length: max_rounds }, (_, roundIndex) => (
          <div key={roundIndex}>
            <table className="w-full h-full border border-collapse mb-4">
              <thead>
                <tr>
                  <td colSpan={2}><h3 className="px-4 py-2 font-bold bg-blue-200">Round {roundIndex + 1}</h3></td>
                </tr>
              </thead>
              <tbody>
                {matches
                  .filter(match => match.round === roundIndex + 1) // Filter matches for the current round
                  .map(match => (
                    <tr key={match.id}>
                      <td className="border px-4 py-2 w-1/4"></td>
                      <td className="border px-4 py-2">
                        {match.participants.map((participant, i) => (
                          <span key={participant.id}>
                            {participant.name}
                            {i < match.participants.length - 1 && (
                              <img src={vsIcon} alt="vs" className="inline h-8 mx-2"  style={{ filter: 'invert(100%)' }} />
                        )}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
