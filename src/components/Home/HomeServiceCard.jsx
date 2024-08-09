import React from 'react'

export default function HomeServiceCard(props) {
    let { icon, title, description } = props;
    return (
        <>

            <div className="bg-white h-[19rem] w-[17rem] drop-shadow-[0_7px_13px_rgba(0,0,0,0.25)] rounded-2xl flex items-center">
                <span className='flex flex-col space-y-4 items-center p-[75px_13px] text-center'><div >{icon}</div>
                    <div className='text-md font-bold'>{title}</div>
                    <div className='font-normal'>{description}</div></span>

            </div>
        </>
    )
}
