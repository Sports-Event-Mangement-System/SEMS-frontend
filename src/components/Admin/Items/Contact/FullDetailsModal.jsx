import React, { useEffect } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";

export default function FullDetailsModal({ closeModal, details }) {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg w-[40%] h-fit py-10 px-20 z-40">
                <button onClick={closeModal} className="text-blue-600 absolute top-4 right-4 hover:text-blue-500">
                    <RiCloseCircleFill size={35} />
                </button>
                <div className='space-y-5'>
                    <div className='font-bold text-2xl flex justify-center text-orange-600 underline'>Full Details</div>
                    {details && details.length > 0 ? (
                        details.map((detail, index) => (
                            <div key={index} className='flex items-start'>
                                <h1 className='font-bold text-lg flex-shrink-0 w-32 flex justify-start'>{index + 1}. {detail.label} :</h1>
                                <div className='ml-5 font-medium text-gray-800 underline'>{detail.value}</div>
                            </div>
                        ))
                    ) : (
                        <p>Loading details...</p>
                    )}
                </div>
            </div>
        </>
    );
}
