import React, { useEffect } from 'react';
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";

export default function DeleteModal({ closeModal, deleteRow }) {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg w-[40%] py-10 px-10 h-fit z-50">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:bg-gray-200 transition-colors duration-200"
                >
                    <RiCloseFill className="h-8 w-8" />
                </button>
                <div className='flex justify-center mb-12 mt-5'>
                    <RiDeleteBin6Line size={80} color='rgb(255,140,0)' />
                </div>
                <div className="text-xl font-semibold flex justify-center">Are you sure?</div>
                <div className="text-lg font-medium text-gray-500 mt-3 flex justify-center">
                    Are you sure you want to delete this row from the table?
                </div>
                <div className="flex justify-center mt-4 gap-3">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                        onClick={deleteRow}
                    >
                        Yes, Delete it!
                    </button>
                </div>
            </div>
        </>
    );
}
