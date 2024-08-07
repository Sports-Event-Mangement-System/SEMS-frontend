import React from 'react'
import HomeServiceCard from './HomeServiceCard'
import { TbTournament } from "react-icons/tb";
import { MdOutlineDisplaySettings, MdOutlineMail } from "react-icons/md";
import About from '../About Us/About';

function Home() {
  const serviceData = [{ icon: <TbTournament size={40} className='text-orange-600' />, title: 'Organize Tournaments', description: 'User can organize their tournament  and we schedule the matches automatically with fair.', }, { icon: <MdOutlineDisplaySettings size={40} className='text-orange-600' />, title: 'Display Match Results', description: 'Show match results only after matches conclude, highlighting the winning team.', }, { icon: <MdOutlineMail size={40} className='text-orange-600' />, title: 'Email Notifications', description: 'Send timely email updates to registered players about their upcoming matches and other important information', },]

  return (
    <>
      <div className='h-screen'>
        <img src="images/file.jpg" alt="" className='w-[191vh] h-[86vh] my-[7px] mx-[9vh] rounded-[33px]' />
        <div className="absolute top-[63px] w-[191vh] h-[86vh] my-[7px] mx-[9vh] rounded-[33px] bg-[rgb(73,73,73)] opacity-[40%]"></div>
        <div className='absolute top-[36vh] left-[34vh] w-[29%] '>
          <h1 className='text-[5vh] text-white leading-[1] font-bold'><span className='text-orange-600'>Organize</span> or Participate in <span className='text-orange-600'>Tournament</span></h1>
          <br />
          <h3 className='text-[3vh] text-white leading-[1] font-bold'>Welcome to Our Sports System</h3>
          <br />
          <p className='text-[18px] text-white leading-[26px] font-normal'>The System where you can organize your tournament or register
            your team to participate in tournament. You can view the match
            results easily</p>
        </div>
        <div className='absolute top-[23vh] right-[20vh] space-y-7 '>
          <img src="images/home2.jpg" alt="" className='rounded-[15px]' />
          <img src="images/home4.jpg" alt="" className='rounded-[15px]' />
        </div>
        <div className='absolute top-[32vh] right-[42vh] space-y-7 '>
          <img src="images/home1.jpg" alt="" className='rounded-[15px]' />
          <img src="images/home3.jpg" alt="" className='rounded-[15px]' />
        </div>
        <h1 className='text-3xl font-bold text-center mt-8'>Why <span className='text-orange-600'> Choose Us</span></h1>

      </div>
      <div className='flex justify-center space-x-24 mt-4' >
        {serviceData.map((service, index) => (
          <HomeServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}

      </div>
      <div className="w-full h-[4px] bg-orange-600 m-[18vh_0_0_0]"></div>

      <About />


    </>


  )
}

export default Home