import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { TbTournament } from "react-icons/tb";

export default function TournamentDetailsContent({ tabIndex, tournamentData, teamData }) {
    return (
        <div>
            {tabIndex == 1 && (
                <div className='space-y-14'>
                    <div>
                        <h1 className='font-bold text-3xl mb-6'>Format</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 w-full'>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><IoLocationSharp size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>LOCATION</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>{tournamentData.address}</div>
                            </div>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><FaBuildingCircleCheck size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>CHECK IN PERIOD</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>45 minutes before start</div>
                            </div>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><FaUsers size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>TEAM SIZE</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>{tournamentData.min_teams} to {tournamentData.max_teams}</div>
                            </div>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><GiWallet size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>ENTRY FEE</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>Sankhu</div></div>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><FaTrophy size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>PRICE POOL</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>Rs. {tournamentData.prize_pool}</div></div>
                            <div className='bg-gray-100 h-fit w-full flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>
                                <div className='flex justify-center text-orange-600'><TbTournament size={45} /></div>
                                <div className='flex justify-center font-bold text-base '>TOURNAMENT FORMAT</div>
                                <div className='flex justify-center font-medium text-base text-orange-600'>{tournamentData.tournament_type}</div></div>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-3xl mb-6'>Participants</h1>
                        <div className='bg-gray-100 h-fit w-[343px] flex flex-col px-8 py-9 rounded-md drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] space-y-2'>

                            <div className='flex justify-between font-bold text-base '>
                                <span>Registered</span>
                                <span className='text-orange-600'>{tournamentData.team_register ?? 0}</span>
                            </div>
                            <div className='flex justify-between font-bold text-base '>
                                <span>Confirmed</span>
                                <span className='text-orange-600'>{tournamentData.team_confirmed ?? 0}</span>
                            </div>
                            <div className='flex justify-between font-bold text-base '>
                                <span>Available Slot</span>
                                <span className='text-orange-600'>{tournamentData.slot_left ?? 0}</span>
                            </div>

                        </div>
                    </div>

                </div>
            )}


            {tabIndex == 2 && (
                <div className='space-y-14'>
                    <div>
                        <h1 className='font-bold text-3xl mb-6'>About This Tournament</h1>
                        <div>
                            <p className='font-medium text-base'>{tournamentData.t_description}</p>
                        </div>
                    </div>

                    <div>

                        <h1 className='font-bold text-3xl mb-6'>Rules</h1>
                        <div>
                            <ul className="list-disc font-medium space-y-1">
                                <li>Please be respectful to your host and other participants. If any malicious behavior is reported, you will be removed from the tournament.</li>
                                <li>Please be on time for your registration and for the actual tournament. You (and your team) will be disqualified on no-show.</li>
                                <li>You and all of your teammates must be registered to qualify for the event.</li>
                                <li>You can play in this tournament only if your registered and in-game names match, otherwise you will be disqualified.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}


            {tabIndex === 3 && (
                <div>
                    <h1 className='font-bold text-3xl mb-6'>Participants in this Tournament</h1>
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-9 w-full'>
                        {teamData.length > 0 ? (
                            teamData.map((team, index) => (
                                <div key={index} className='bg-gray-100 h-fit w-full flex flex-row drop-shadow-[0_7px_3px_rgba(0,0,0,0.30)] px-2 py-2'>
                                    <div className='w-[25%]'>
                                        <img src={team.logo_urls || "/images/Logo.png"} alt="Team Logo" className='h-28 w-28 pl-3' />
                                    </div>
                                    <div className='flex flex-col justify-center items-center w-full'>
                                        <h1 className='font-medium text-base '><b>Team Name: </b>{team.team_name}</h1>
                                        <h2 className='font-medium text-base '><b>Team Coach: </b>{team.coach_name || 'N/A'}</h2>
                                        <h2 className='font-medium text-base '><b>Address: </b>{team.address || 'N/A'}</h2>
                                        <h2 className='font-medium text-base '><b>No of players: </b>{team.player_number || 'N/A'}</h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No teams have registered yet.</p>
                        )}
                    </div>
                </div>
            )}



            {tabIndex == 4 && (
                <div>
                    <h1 className='font-bold text-3xl mb-6'>Prices</h1>
                </div>
            )}

        </div>
    )
}
