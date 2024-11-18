import React from 'react';

export default function Card({ children, background }) {
    return (
        <div
            className={`w-fit h-fit rounded-md border border-[#c6c6c6] cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg ${background}`}
        >
            {children}
        </div>
    );
}
