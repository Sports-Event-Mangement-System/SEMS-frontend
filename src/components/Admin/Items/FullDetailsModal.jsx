import React, { useEffect } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";

export default function FullDetailsModal({ closeModal, contactDetails }) {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg w-[40%] h-fit py-10 px-20">
                <button onClick={closeModal} className="text-blue-600 absolute top-4 right-4 hover:text-blue-500">
                    <RiCloseCircleFill size={35} />
                </button>
                <div className=' space-y-5'>
                    <div className='font-bold text-2xl flex justify-center text-orange-600 underline'>Full details</div>
                    {contactDetails ? (
                        <>
                            <div className='flex items-start'>
                                <h1 className='font-bold text-lg w-32 flex justify-start'>1. Full Name :</h1>
                                <div className='ml-5 font-medium text-gray-800 underline'>{contactDetails.first_name + ' ' + contactDetails.last_name}</div>
                            </div>
                            <div className='flex items-start'>
                                <h1 className='font-bold text-lg w-32 flex justify-start'>2. Email :</h1>
                                <div className='ml-5 font-medium text-gray-800 underline'>{contactDetails.email}</div>
                            </div>
                            <div className='flex items-start'>
                                <h1 className='font-bold text-lg w-32 flex justify-start'>3. Phone :</h1>
                                <div className='ml-5 font-medium text-gray-800 underline'>{contactDetails.phone_number}</div>
                            </div>
                            <div className='flex items-start'>
                                <h1 className='font-bold text-lg flex-shrink-0 w-32 flex justify-start'>4. Message :</h1>
                                <div className='ml-5 font-medium text-gray-800 underline'>{contactDetails.message}</div>
                            </div>
                        </>
                    ) : (
                        <p>Loading contact details...</p>
                    )}

                </div>
            </div>
        </>
    );
}
