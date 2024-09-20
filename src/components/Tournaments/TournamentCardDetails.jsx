import React, { useEffect, useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import TournamentDetailsContent from './TournamentDetailsContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TournamentCardDetails() {
    const [toggle, setToggle] = useState(1);
    const [tournamentData, setTournamentData] = useState(null); // Initially null to handle loading state

    const { id } = useParams();

    const toggleTab = (index) => {
        setToggle(index);
    };

    useEffect(() => {
        const fetchTournamentData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/edit/tournament/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    },
                });
                console.log(response)
                setTournamentData(response.data.tournament);
            } catch (error) {
                console.log('Error in fetching:', error);
            }
        };
        fetchTournamentData();

        return () => {
        };
    }, [id]);

    if (!tournamentData) {
        // Return a loading state while the data is being fetched
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return !isNaN(date) ? date.toLocaleDateString(undefined, options) : "Invalid date";
    };
    return (
        <div className='flex flex-col items-center'>
            <div className='w-[70%] bg-gray-200 h-fit space-y-9 pb-8'>
                <img src={tournamentData.t_logo ? tournamentData.image_url : "images/tournament.jpg"} alt="" className='w-full h-[70vh] object-top object-cover' />

                <div className='flex justify-between px-16 items-center'>
                    <div className='space-y-1'>
                        <h1 className='font-bold text-4xl text-orange-600'>{tournamentData.t_name}</h1>
                        <h2 className='font-bold text-lg'>Registration Date: <span className='font-medium'> {formatDate(tournamentData.ts_date)} to {formatDate(tournamentData.te_date)}</span></h2>
                        <h2 className='font-bold text-lg'>Start Date: <span className='font-medium'> {formatDate(tournamentData.rs_date)} to {formatDate(tournamentData.re_date)}</span></h2>
                        <h2 className='font-bold text-lg'>Location: <span className='font-medium'> {tournamentData.address}</span></h2>
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <h1 className='font-bold text-xl flex items-end'>Prize Pool: <MdCurrencyRupee size={22} /> {tournamentData.prize_pool}</h1>
                        <button className='h-fit w-fit border-2 bg-orange-600 border-transparent px-3 py-1 rounded-lg font-semibold text-white hover:border-white'>Register</button>
                    </div>
                </div>
                <div className='bg-gray-400 h-1 w-[95%] items-center mx-auto'></div>

                <div className='grid grid-cols-4'>
                    <div className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-lg hover:text-orange-600 ${toggle === 1 ? 'text-orange-600' : ''}`}>
                        <span className='cursor-pointer' onClick={() => toggleTab(1)}>OVERVIEW</span>
                    </div>
                    <div className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-lg hover:text-orange-600 ${toggle === 2 ? 'text-orange-600' : ''}`}>
                        <span className='cursor-pointer' onClick={() => toggleTab(2)}>INFORMATION</span>
                    </div>
                    <div className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-lg hover:text-orange-600 ${toggle === 3 ? 'text-orange-600' : ''}`}>
                        <span className='cursor-pointer' onClick={() => toggleTab(3)}>PARTICIPANT</span>
                    </div>
                    <div className={`flex justify-center items-center font-bold text-lg hover:text-orange-600 ${toggle === 4 ? 'text-orange-600' : ''}`}>
                        <span className='cursor-pointer' onClick={() => toggleTab(4)}>PRIZES</span>
                    </div>
                </div>

            </div>

            <div className='w-[70%] h-fit mt-16'>
                <TournamentDetailsContent tabIndex={toggle} address={tournamentData.address} team_size={tournamentData.team_number} price={tournamentData.prize_pool} description={tournamentData.t_description} />
            </div>

        </div>
    );
}
