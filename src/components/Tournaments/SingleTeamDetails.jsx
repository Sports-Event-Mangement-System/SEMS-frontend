import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SingleTeamDetails() {
    const { id } = useParams();
    const [teamDetails, setTeamDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/show/team/${id}`);
                console.log(response);
                setTeamDetails(response.data.team);
            } catch (error) {
                console.log('Error fetching team details:', error);
            }
        };

        fetchTeamDetails();
    }, [id]);

    return (
        <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md pl-20'>
            <button
                className='mb-6 px-4 py-2 w-14 bg-orange-600 text-white flex justify-center items-center rounded hover:bg-orange-500'
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            <h2 className='font-bold text-xl mb-4'>Team Details</h2>

            {teamDetails ? (
                <div>

                    <h1 className='font-medium text-lg mb-2'><b>Team Name: </b>{teamDetails.team_name}</h1>


                    <img
                        src={teamDetails.logo_urls || '/images/Logo.png'}
                        alt="Team Logo"
                        className='h-28 w-28 mb-4'
                    />

                    <h2 className='font-medium text-lg mb-2'><b>Coach Name: </b>{teamDetails.coach_name}</h2>

                    <h2 className='font-medium text-lg mb-2'><b>Phone Number: </b>{teamDetails.phone_number}</h2>

                    <h2 className='font-medium text-lg mb-2'><b>Email: </b>{teamDetails.email}</h2>


                    <div>
                        <h2 className='font-bold text-lg mb-2'>Players:</h2>
                        <ul className='list-decimal pl-5'>
                            {teamDetails.players && teamDetails.players.length > 0 ? (
                                teamDetails.players.map((player, index) => (
                                    <li key={index} className='font-medium text-base mb-1'>
                                        {player.player_name || 'Unknown Player'}
                                    </li>
                                ))
                            ) : (
                                <li>No players registered yet.</li>
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading team details...</p>
            )}
        </div>
    );
}
