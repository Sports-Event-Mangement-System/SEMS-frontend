import React, { useEffect } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";

export default function Modal({ closeModal, children }) {
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
                {children}


            </div>
        </>
    );
}
