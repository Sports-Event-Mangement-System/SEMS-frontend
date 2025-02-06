import React from 'react';

const PredictionProgressBar = ({ team1Percentage, team2Percentage, team1, team2 }) => {
    return (
        <div className="w-full my-4">
            <div className="relative h-6 bg-gray-200 overflow-hidden rounded-md">
                {/* Team 1 progress */}
                <div 
                    className="absolute h-full bg-green-400 flex items-center justify-center"
                    style={{ 
                        width: `${team1Percentage}%`,
                        left: 0
                    }}
                >
                    <span className="text-white font-semibold">{team1}: {team1Percentage}%</span>
                </div>
                
                {/* Team 2 progress */}
                <div 
                    className="absolute h-full bg-blue-400 flex items-center justify-center"
                    style={{ 
                        width: `${team2Percentage}%`,
                        right: 0
                    }}
                >
                    <span className="text-white font-semibold">{team2}: {team2Percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default PredictionProgressBar; 