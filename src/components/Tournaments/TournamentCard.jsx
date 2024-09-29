import React from 'react';
import { FaUsers, FaTrophy } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom"
import { TbTournament } from "react-icons/tb";
import Ribbon from '../Ui/Ribbon/Ribbon';


export default function TournamentCard({ tournament_name, team_num, address, reg_start, reg_end, price, image, t_images, id, featured, format }) {

    return (
        <Link to={`/tournamentDetails/${id}`}>
            <div className="relative flex flex-col bg-white h-fit w-[20rem] drop-shadow-[0_7px_13px_rgba(0,0,0,0.25)] rounded-2xl pb-5 group">

                <div className="absolute top-0 left-0 z-10">
                {featured === 1 ? <Ribbon text='Featured'
                    >
                    </Ribbon> : null} 
                    
                </div>

                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl" style={{ zIndex: 0 }}></div>


                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="text-white font-semibold border-2 px-4 py-2 rounded-2xl bg-gray-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                        View Details
                    </span>
                </div>


                <img src={t_images[0] ? image[0] : "images/tournament.jpg"} alt="" className='rounded-t-2xl w-full h-48 object-cover object-top' />


                <div className='flex flex-col items-center m-5 space-y-3'>
                    <div className='text-xl font-bold'>{tournament_name}</div>
                    <div className='flex flex-col justify-start space-y-1'>
                        <div className='text-sm font-normal flex items-center gap-2'>
                            <span className='font-bold flex items-center gap-2'>
                                <FaUsers size={18} /> Teams:
                            </span>
                            <span className='font-semibold text-sm text-gray-600'>{team_num}</span>
                        </div>
                        <div className='text-sm font-normal flex items-center gap-2'>
                            <span className='font-bold flex items-center justify-start gap-2'><IoLocationSharp size={18} />Address:</span> <span className='font-semibold text-sm text-gray-600'>{address}</span>
                        </div>
                        <div className='text-sm font-normal flex items-center gap-2'>
                            <span className='font-bold flex items-center gap-2'><GiNotebook size={18} />Registration:</span> <span className='font-semibold text-sm text-gray-600'>{reg_start} to {reg_end}</span>
                        </div>
                        <div className='text-sm font-normal flex items-center gap-2'>
                            <span className='font-bold flex items-center gap-2'><FaTrophy size={18} /> Price:</span><span className='font-semibold text-sm text-gray-600'>Rs {price}</span>
                        </div>
                        <div className='text-sm font-normal flex items-center gap-2'>
                            <span className='font-bold flex items-center gap-2'><TbTournament size={18} /> Format:</span><span className='font-semibold text-sm text-gray-600'>{format}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
