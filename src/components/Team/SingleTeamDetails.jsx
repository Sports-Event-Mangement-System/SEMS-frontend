import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '../Ui/Tab/Tab';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { GrUserManager, GrPhone } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import Card from '../Ui/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setPendingAction, clearPendingAction } from '../../store/PendingActionsSlice';
import { toast } from 'react-toastify';

export default function SingleTeamDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teamDetails, setTeamDetails] = useState(null);
    const [fixtureMatches, setFixtureMatches] = useState(null);
    const [resultMatches, setResultMatches] = useState(null);
    const dispatch = useDispatch();
    const [isFollowed, setIsFollowed] = useState(false);


    const { user } = useSelector(state => state.auth);
    const pendingAction = useSelector(state => state.pendingActions);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/show/team/${id}`, {
                    params: {
                        user_id: user?.user_details?.id
                    }
                });
                setTeamDetails(response.data.team);
                setFixtureMatches(response.data.team.fixture_matches);
                setResultMatches(response.data.team.result_matches);
                setIsFollowed(response.data.team.is_followed);
            } catch (error) {
                console.error('Error fetching team details:', error);
            }
        };

        fetchTeamDetails();
    }, [id]);

    const handleFollow = async (autoFollow = false) => {
        try {
            if (user === null && !autoFollow) {
                dispatch(setPendingAction({
                    type: 'FOLLOW_TEAM',
                    data: { teamId: id }
                }));
                navigate('/login');
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/follow/team/${id}`, {
                user_id: user?.user_details?.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (autoFollow) {
                navigate(`/TeamDetails/${id}`, { replace: true });
            }

            setIsFollowed(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Error following team');
        }
    };

    useEffect(() => {
        if (!!user?.user_details && pendingAction?.action?.type === 'FOLLOW_TEAM' && pendingAction?.action?.data?.teamId == id) {
            handleFollow(true);
            dispatch(clearPendingAction());
        }
    }, [user, pendingAction, id]);
    return (
        <div>
            {teamDetails ? (
                <>
                    <div className='bg-[url("/images/white-background.jpg")] bg-cover bg-center h-80 w-full flex items-center px-8 py-9 rounded-md pl-20 relative'>
                        <img
                            src={teamDetails?.logo_urls || '/images/Logo.png'}
                            alt="Team Logo"
                            className='h-40 w-36 mr-4'
                        />
                        <h1 className='font-bold text-[3.25rem] mb-2 uppercase'><b></b>{teamDetails?.team_name}</h1>
                        <div onClick={() => handleFollow()} className={`group flex justify-center items-center gap-2 cursor-pointer rounded-lg w-34 h-14 py-2 px-4 border ${isFollowed ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-600 bg-white text-blue-600 hover:border-blue-600 hover:text-white hover:bg-blue-600'} absolute top-4 right-4`}>
                            {isFollowed ? (
                                <FaStar size={22} className="block" />
                            ) : (
                                <FaRegStar size={22} className="group-hover:block" />
                            )}
                            <span className='text-[18px] font-semibold'>{isFollowed ? 'Following' : 'Follow'}</span>
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
                                        <h2 className="font-bold text-lg mb-2">Matches:</h2>
                                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-12 w-full justify-items-center mt-12">
                                            {fixtureMatches.length > 0 ? (
                                                fixtureMatches.map((match, index) => (
                                                    <Card
                                                        key={index}
                                                        participants={match.participants}
                                                        startTime={match.startTime}
                                                        tournamentName={teamDetails.tournament.t_name}
                                                    />
                                                ))
                                            ) : (
                                                <p>There is no fixture available for this team</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            <Tab label="Results">
                                <div className="py-4">
                                    <div>
                                        <h2 className="font-bold text-lg mb-2">Results:</h2>
                                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-12 w-full justify-items-center mt-12">

                                            {resultMatches.length > 0 ? (
                                                resultMatches.map((match, index) => (
                                                    <Card
                                                        key={index}
                                                        participants={match.participants}
                                                        startTime={match.startTime}
                                                        tournamentName={teamDetails.tournament.t_name}
                                                    />
                                                ))
                                            ) : (
                                                <p>No any results</p>
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
