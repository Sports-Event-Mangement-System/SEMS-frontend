import React from 'react';
import Card from '../../../Ui/Card/Card';
import { FaTrophy } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { IoMdMan } from "react-icons/io";

export default function DashboardManagement() {
  const cardData = [
    { title: 'TOTAL TOURNAMENT', icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-red-100' },
    { title: 'TOTAL TEAM', icon: <HiUserGroup size={24} color="#e97026" />, color: 'bg-blue-100' },
    { title: 'TOTAL PLAYER', icon: <IoMdMan size={24} color="#e97026" />, color: 'bg-teal-100' },
    { title: 'ACTIVE TOURNAMENT', icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-orange-100' },
    { title: 'ACTIVE TEAM', icon: <HiUserGroup size={24} color="#e97026" />, color: 'bg-purple-100' },
    { title: 'ONGOING TOURNAMENT', icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-yellow-100' },
    { title: 'COMPLETED TOURNAMENT', icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-green-100' },
  ];

  return (
    <div className="m-4">
      <div className="font-bold text-2xl mb-7">DASHBOARD</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cardData.map((card, index) => (
          <Card key={index} background={card.color}>
            <div className="m-6">
              <div className="text-gray-500 font-medium text-base text-center w-[40vh] mb-6">
                {card.title}
              </div>
              <div className="flex gap-8 items-center">
                <div className="p-2 h-fit w-fit rounded-md bg-[#dcdcdc]">{card.icon}</div>
                <h1 className="text-2xl font-medium">122</h1>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
