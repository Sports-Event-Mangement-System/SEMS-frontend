
import React from 'react';

export default function Card({ participants, startTime, tournamentName }) {
    return (
        <div className="bg-white w-[57vh] h-fit rounded-md border py-5 border-[#c6c6c6] cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            <div className="flex h-fit w-full px-5">
                <div className="flex flex-col space-y-4 border-r-2 border-r-gray-300 h-15 w-[70%]">
                    <div className="flex justify-between pr-4 items-center">
                        <div className="flex items-center">
                            <img
                                src={participants[0]?.teamLogo || "/images/Logo.png"}
                                alt="Team Logo"
                                className="w-9 h-9 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                            />
                            <span className="text-black rounded-full text-[16px] font-semibold">
                                {participants[0]?.name}
                            </span>
                        </div>
                        <div className="font-semibold">{participants[0]?.resultText}</div>
                    </div>

                    {participants[1] ? (
                        <div className="flex justify-between pr-4 items-center">
                            <div className="flex items-center">
                                <img
                                    src={participants[1]?.teamLogo || "/images/Logo.png"}
                                    alt="Team Logo"
                                    className="w-9 h-9 rounded-2xl object-cover object-top drop-shadow-[0_6px_5px_rgba(0,0,0,0.15)] mr-2"
                                />
                                <span className="text-black rounded-full text-[16px] font-semibold">
                                    {participants[1]?.name}
                                </span>
                            </div>
                            <div className="font-semibold">{participants[1]?.resultText}</div>
                        </div>
                    ) : (
                        <div className="h-9">
                            <h1 className="font-semibold text-blue-500">Walk over match</h1>
                        </div>
                    )}
                </div>

                <div className="flex h-15 items-center justify-center w-[30%]">
                    <div className="text-black text-[16px] font-semibold">{startTime || "Not Decided"}</div>
                </div>
            </div>

            <hr className="my-4 border-1 border-gray-300 w-full" />
            <div className="px-5">
                <h1>{tournamentName}</h1>
            </div>
        </div>
    );
}
