
import React from 'react';

export default function Card({ children }) {
    return (
        <div className="bg-white w-fit h-fit rounded-md border border-[#c6c6c6] cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            {children}
        </div>
    );
}
