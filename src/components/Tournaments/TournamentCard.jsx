import React, { useState } from 'react'

export default function TournamentCard({ tournamentName, teamNum, address, sDate, eDate, regStart, regEnd, price, image, tLogo }) {


    return (
        <div className="flex flex-col bg-white h-fit w-[20rem] drop-shadow-[0_7px_13px_rgba(0,0,0,0.25)] rounded-2xl ">

            <img src={tLogo ? image : "images/tournament.jpg"} alt="" className='rounded-t-2xl w-full h-40' />
            <div className='flex flex-col items-center m-5'>
                <div className='text-xl font-bold'>{tournamentName}</div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>No of Teams:</span> {teamNum}
                </div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>Location:</span> {address}
                </div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>Start Date:</span> {sDate}
                </div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>Ending Date:</span> {eDate}
                </div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>Registration Start:</span> {regStart}
                </div>
                <div className='text-sm font-normal'>
                    <span className='font-semibold'>Reg Ending Date:</span> {regEnd}
                </div>
                <div className='flex justify-end text-sm font-normal'>
                    <span className='font-semibold'>Price:</span> {price}
                </div>
                <button className='border-none underline w-fit h-9 px-3 rounded-lg text-orange-600 font-medium'>
                    More details...
                </button>
            </div>

        </div>

    )
}
