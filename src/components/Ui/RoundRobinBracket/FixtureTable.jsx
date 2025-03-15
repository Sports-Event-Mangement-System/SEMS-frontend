import React from "react";
import vsIcon from '/svg/versus-icon.svg';

export default function FixtureTable({ matches, max_rounds }) {
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
                      <td className="border px-4 py-2 w-1/4">
                        <span className="font-semibold">{match.startTime ? match.startTime : 'Not Scheduled Yet'}</span>
                      </td>
                      <td className="border px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center w-full">
                          {match.participants.map((participant, i) => (
                            <React.Fragment key={participant.id}>
                              {/* Left Participant */}
                              {i === 0 && (
                                <div className="flex items-center w-4/12">
                                  {participant.teamLogo && (
                                    <img 
                                      src={participant.teamLogo} 

                                      className="inline h-8 w-8 mx-2 rounded-full" 
                                      alt={participant.name} 
                                  />
                                  )}
                                  <span className="font-semibold">{participant.name}</span>
                                </div>
                              )}
                              
                              {/* VS Icon */}
                              {i === 0 && match.participants.length > 1 && (
                                <div className="flex items-center w-1/12">
                                  <img 
                                    src={vsIcon} 
                                    alt="vs" 
                                    className="h-8" 
                                    style={{ filter: 'invert(100%)' }} 

                                  />
                                </div>
                              )}

                              {/* Right Participant */}
                              {i === 1 && (
                                <div className="flex items-center">
                                  {participant.teamLogo && (
                                  <img 
                                    src={participant.teamLogo}
                                    className="inline h-8 w-8 mx-2 rounded-full" 
                                    alt={participant.name} 
                                    />

                                  )}
                                  <span className="font-semibold">{participant.name}</span>
                                </div>

                              )}
                              {match.participants.length === 1 && (
                                <span className="font-bold">(Rest This Round)</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
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
