import React, { useEffect, useState } from 'react';
import Card from '../../../Ui/Card/Card';
import { FaTrophy } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { IoMdMan } from "react-icons/io";
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function DashboardManagement() {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const cardData = [
    { title: 'TOTAL TOURNAMENT', value: dashboardData?.total_tournaments || 0, icon: < FaTrophy size={24} color="#e97026" />, color: 'bg-red-100' },
    { title: 'TOTAL TEAM', value: dashboardData?.total_teams || 0, icon: <HiUserGroup size={24} color="#e97026" />, color: 'bg-blue-100' },
    { title: 'TOTAL PLAYER', value: dashboardData?.total_players || 0, icon: <IoMdMan size={24} color="#e97026" />, color: 'bg-teal-100' },
    { title: 'ACTIVE TOURNAMENT', value: dashboardData?.active_tournaments || 0, icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-orange-100' },
    { title: 'ACTIVE TEAM', value: dashboardData?.active_teams || 0, icon: <HiUserGroup size={24} color="#e97026" />, color: 'bg-purple-100' },
    { title: 'ONGOING TOURNAMENT', value: dashboardData?.ongoing_tournaments || 0, icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-yellow-100' },
    { title: 'COMPLETED TOURNAMENT', value: dashboardData?.completed_tournaments || 0, icon: <FaTrophy size={24} color="#e97026" />, color: 'bg-green-100' },
  ];

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        }
      });
      setDashboardData(response.data.data);
    } catch (error) {
      console.log("Error in fetching", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
                <h1 className="text-2xl font-medium">{card.value}</h1>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 p-4 bg-white rounded-lg shadow-md">
        <Flatpickr
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          options={{
            inline: true,
          }}

        />
      </div>


    </div>
  );
}
