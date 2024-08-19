import React from 'react'

export default function TournamentCard() {
    return (
        <div className="flex flex-col bg-white h-[19rem] w-[20rem] drop-shadow-[0_7px_13px_rgba(0,0,0,0.25)] rounded-2xl ">
            <img src="images/tournament.jpg" alt="" className='rounded-t-2xl w-full h-40' />
            <div className='flex flex-col items-center m-5'>
                <div className='text-xl font-semibold'>Texas Futsal Tournament</div>
                <div className='text-sm font-normal'>No of Teams: 12</div>
                <div className='text-sm font-normal'>Location: Sankhu</div>
                <div className='text-sm font-normal'>Start Date: Aug 17</div>
            </div>
        </div>

    )
}
