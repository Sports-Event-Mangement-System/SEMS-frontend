import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '../Ui/Tab/Tab';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { GrUserManager, GrPhone } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';

export default function SingleTeamDetails() {
    const { id } = useParams();

    const [teamDetails, setTeamDetails] = useState(null);
    const [fixtureMatches, setFixtureMatches] = useState(null);
    const [resultMatches, setResultMatches] = useState(null);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/show/team/${id}`);
                console.log(response);
                setTeamDetails(response.data.team);
                setFixtureMatches(response.data.team.fixture_matches);
                setResultMatches(response.data.team.result_matches);
            } catch (error) {
                console.error('Error fetching team details:', error);
            }
        };

        fetchTeamDetails();
    }, [id]);

    return (
        <div>
            {teamDetails ? (
                <>
                    <div className='bg-[url("/images/white-background.jpg")] bg-cover bg-center h-80 w-full flex items-center px-8 py-9 rounded-md pl-20 relative'>
                        <img
                            src={teamDetails?.logo_urls || '/images/Logo.png'}
                            alt="Team Logo"
                            className='h-30 w-30 mr-4'
                        />
                        <h1 className='font-bold text-[3.25rem] mb-2 uppercase'><b></b>{teamDetails?.team_name}</h1>
                        <div className="group flex justify-center items-center gap-2 cursor-pointer rounded-lg w-34 h-14 py-2 px-4 border border-blue-600 bg-white text-blue-600 hover:border-blue-600 hover:text-white hover:bg-blue-600 absolute top-4 right-4">
                            <FaRegStar size={22} className="group-hover:hidden" />
                            <FaStar size={22} className="hidden group-hover:block" /> 
                            <span className='text-[18px] font-semibold'>Follow</span>
                        </div>
                    </div>
                    <div className='px-8 py-9 rounded-md pl-20'>
                        <Tabs>
                            <Tab label="Team Details">
                                <div className="py-4">
                                    <div className='flex items-center'>
                                        <GrUserManager size={20} />
                                        <h2 className='font-medium text-2xl mb-2 ml-2'><b>Coach Name:</b> {teamDetails.coach_name}</h2>
                                    </div>
                                    <div className='flex items-center'>
                                        <GrPhone size={20} />
                                        <h2 className='font-medium text-2xl mb-2 ml-2'><b>Phone Number:</b> {teamDetails.phone_number}</h2>
                                    </div>
                                    <div className='flex items-center'>
                                        <MdEmail size={20} />
                                        <h2 className='font-medium text-2xl mb-2 ml-2'><b>Email:</b> {teamDetails.email}</h2>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Fixtures">
                                <div className="py-4">
                                    <div>
                                        <h2 className='font-bold text-lg mb-2'>Matches:</h2>
                                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-9 w-full">
                                            {fixtureMatches.length > 0 ? (  
                                                fixtureMatches.map((match, index) => (
                                                    <div
                                                        className="bg-[#f4f4f4] h-fit w-full flex flex-row rounded-md border border-[#c6c6c6] px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        <div className="w-full h-full flex flex-col">
                                                            <div className="flex mb-4">
                                                                <img
                                                                    src={match.participants[0].teamLogo  || "/images/Logo.png"}
                                                                    alt="Team Logo"
                                                                    className="w-24 h-18 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                                                                />
                                                                <span className='text-red-500 mt-2 px-2 py-4 rounded-full text-xl font-bold'>{match.participants[0].name}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <img
                                                                    src={match.participants[1].teamLogo  || "/images/Logo.png"}
                                                                    alt="Team Logo"
                                                                    className="w-24 h-18 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                                                                />
                                                                <span className='text-red-500 mt-2 px-2 py-1 rounded-full text-xl font-bold'>{match.participants[1].name}</span>
                                                            </div>
                                                        <hr className="my-4 border-t border-gray-400 w-full" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No teams have registered yet.</p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Results">
                                <div className="py-4">
                                    <div>
                                        <h2 className='font-bold text-lg mb-2'>Results:</h2>
                                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-9 w-full">
                                            {resultMatches.length > 0 ? (  
                                                resultMatches.map((match, index) => (
                                                    <div
                                                        className="bg-[#f4f4f4] h-fit w-full flex flex-row rounded-md border border-[#c6c6c6] px-2 py-2 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        <div className="w-full h-full flex flex-col">
                                                            <div className="flex mb-4">
                                                                <img
                                                                    src={match.participants[0].teamLogo  || "/images/Logo.png"}
                                                                    alt="Team Logo"
                                                                    className="w-24 h-18 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                                                                />
                                                                <span className='text-red-500 mt-2 px-2 py-4 rounded-full text-xl font-bold'>{match.participants[0].name}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <img
                                                                    src={match.participants[1].teamLogo  || "/images/Logo.png"}
                                                                    alt="Team Logo"
                                                                    className="w-24 h-18 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                                                                />
                                                                <span className='text-red-500 mt-2 px-2 py-1 rounded-full text-xl font-bold'>{match.participants[1].name}</span>
                                                            </div>
                                                        <hr className="my-4 border-t border-gray-400 w-full" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No teams have registered yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Squad">
                                <div className="py-4">
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
                            </Tab>
                        </Tabs>
                    </div>


                </>
            ) : (
                <p>Loading team details...</p>
            )
            }
        </div >

    );
}
