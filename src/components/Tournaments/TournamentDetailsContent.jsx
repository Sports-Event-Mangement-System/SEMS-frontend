import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { TbTournament } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import {
    SingleEliminationBracket,
    Match,
    SVGViewer,
} from "@g-loot/react-tournament-brackets";
import { useWindowSize } from "@uidotdev/usehooks";
import RoundRobinBracket from '../Admin/Items/Schedule/RoundRobinBracket';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function TournamentDetailsContent({ tabIndex, tournamentData, teamData }) {
    const [matches, setMatches] = useState([]);
    const [showTiesheet, setShowTiesheet] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { width, height } = useWindowSize();
    const finalWidth = Math.max(width - 50, 500);
    const finalHeight = Math.max(height - 100, 500);

    const [maxRounds, setMaxRounds] = useState([]);
    const [pointsTableData, setPointsTableData] = useState([]);

    const getTiesheetResponse = async () => {
        console.log("hello")
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/tiesheet/response/${tournamentData.id}`
            );
            console.log(response.data)
            setMatches(response.data.matches || []);
            setShowTiesheet(response.data.showTiesheet || false);
            if (tournamentData.tournament_type = "round-robin") {
                setPointsTableData(response.data.points_table || []);
              }
            setMaxRounds(response.data.max_rounds);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching tiesheet");
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTiesheetResponse();
        console.log(matches)
    }, []);

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
                <>
                    <h1 className="font-bold text-3xl mb-6">Participants in this Tournament</h1>
                    <div
                        className="bg-[#fbfbfb] h-fit w-full flex flex-row rounded-lg border border-[#e0e0e0] p-14"
                    >
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-9 w-full">
                            {teamData.length > 0 ? (
                                teamData.map((team, index) => (
                                    <NavLink to={`/TeamDetails/${team.id}`} key={index}>
                                        <div
                                            className="bg-[#f4f4f4] h-fit w-full flex flex-row rounded-md border border-[#c6c6c6] px-4 py-4 hover:bg-gray-200 cursor-pointer"
                                        >
                                            <div className="w-[25%] ">
                                                <img
                                                    src={team.logo_urls || "/images/Logo.png"}
                                                    alt="Team Logo"
                                                    className="w-full h-28 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)]"
                                                />
                                            </div>
                                            <div className="flex justify-center items-center w-full">
                                                <div className='flex flex-col items-start'>
                                                    <div className='flex'>
                                                        <h1 className='w-32'><b>Team Name: </b></h1><span>{team.team_name || "N/A"}</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <h1 className='w-32'><b>Team Coach: </b></h1><span>{team.coach_name || "N/A"}</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <h1 className='w-32'><b>Address: </b></h1><span>{team.address || "N/A"}</span>
                                                    </div>
                                                    <div className='flex'>
                                                        <h1 className='w-32'><b>No of Players: </b></h1><span>{team.player_number || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                            ) : (
                                <p>No teams have registered yet.</p>
                            )}
                        </div>
                    </div>
                </>
            )}




            {
                tabIndex == 4 && (
                    <>
                        <div>
                            <h1 className='font-bold text-3xl mb-6'>{tournamentData.tournament_type === "single-elimination" ? "Single Elimination" : "Round Robin"}</h1>
                        </div>
                        <div>
                            {matches.length > 0 ? (
                                tournamentData.tournament_type === "single-elimination" ? (
                                    <SingleEliminationBracket
                                        matches={matches}
                                        matchComponent={Match}
                                        svgWrapper={({ children, ...props }) => (
                                            <SVGViewer width={finalWidth} height={finalHeight} {...props}>
                                                {children}
                                            </SVGViewer>
                                        )}
                                    />
                                ) : (
                                    <RoundRobinBracket matches={matches} max_rounds={maxRounds} pointsTable={pointsTableData} />
                                )
                            ) : (
                                <p>Tiesheet not found</p>
                            )}
                        </div>
                    </>

                )
            }
            {
                tabIndex == 5 && (
                    <>
                        <div>
                            Fixtures here
                        </div>
                    </>

                )
            }

        </div >
    )
}
