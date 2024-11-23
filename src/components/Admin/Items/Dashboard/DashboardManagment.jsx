import React, { useEffect, useState } from 'react';
import Card from '../../../Ui/Card/Card';
import { FaTrophy } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { IoMdMan } from "react-icons/io";
import axios from 'axios';
import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";
import CountUp from 'react-countup';
import PageHeader from '../../../Ui/Header/PageHeader';

export default function DashboardManagement() {
  const [dashboardData, setDashboardData] = useState(null);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: '2024-11-09', title: 'Development planning', time: '9:20 AM' },
    { date: '2024-11-12', title: 'Design new UI and check sales', time: '11:30 AM' },
    { date: '2024-11-25', title: 'Weekly catch-up', time: '2:00 PM' },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date[0]);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

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

  const breadcrumbs = [
    { label: 'Dashboard', link: '/admin/dashboardManagment' },
  ];

  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageHeader 
        title="Dashboard"
        breadcrumbItems={breadcrumbs}
      />
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
                <h1 className="text-2xl font-medium">
                <CountUp end={card.value} />
                </h1>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 p-4 bg-white rounded-lg shadow-md">
        <Flatpickr
          value={selectedDate}
          onChange={handleDateChange}
          options={{
            inline: true,
            dateFormat: 'Y-m-d',
          }}
          className="h-14 w-full border rounded-lg px-3 py-2 focus:outline-orange-400"
          />
      <div className="events-list">
        <h3>Events:</h3>
        {events
          .filter(event => event.date === formatDate(selectedDate))
          .map((event, index) => (
            <div key={index} className="event-item">
              <strong>{event.title}</strong> at {event.time}
            </div>
          ))}
      </div>
    </div>

    </div>
    </div>
  );
}
