import React from "react";
import HomeServiceCard from "./HomeServiceCard";
import { TbTournament } from "react-icons/tb";
import { MdOutlineDisplaySettings, MdOutlineMail } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const serviceData = [
    {
      icon: <TbTournament size={40} className="text-orange-600" />,
      title: "Organize Tournaments",
      description:
        "User can organize their tournament  and we schedule the matches automatically with fair.",
    },
    {
      icon: <MdOutlineDisplaySettings size={40} className="text-orange-600" />,
      title: "Display Match Results",
      description:
        "Show match results only after matches conclude, highlighting the winning team.",
    },
    {
      icon: <MdOutlineMail size={40} className="text-orange-600" />,
      title: "Email Notifications",
      description:
        "Send timely email updates to registered players about their upcoming matches and other important information",
    },
  ];

  return (
    <>
      <div className="h-screen flex flex-col items-center ">
        <img
          src="images/file.jpg"
          alt=""
          className="w-full h-[86vh] my-[7px] mt-0"
        />
        <div className="absolute mt-0 w-full h-[86vh] bg-black bg-opacity-40"></div>
        <div className="flex absolute top-[10vh] justify-evenly items-center h-[86vh]">
          <div className="w-[45%]">
            <h1 className="text-[5vh] text-white font-bold">
              <span className="text-orange-600">Organize</span> or Participate
            </h1>
            <h1 className="text-[5vh] text-white font-bold">
              in <span className="text-orange-600">Tournament</span>
            </h1>
            <br />

            <h1
              style={{
                margin: "auto 0",
                color: "white",
                fontWeight: "bold",
                fontSize: "3vh",
              }}
            >
              Welcome to Our{" "}
              <span
                style={{
                  color: "#EA580C",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                <Typewriter
                  words={["Sports Event Management System"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={90}
                  deleteSpeed={70}
                  delaySpeed={1200}
                />
              </span>
            </h1>
            <br />
            <p className="text-[18px] text-white font-normal">
              The System where you can organize your tournament or register your
              team to participate in tournament. You can view the match results
              easily.
            </p>
          </div>
          <div className="flex gap-10 h-full">
            <div className=" space-y-7 pt-[22vh] ">
              <img src="images/home2.jpg" alt="" className="rounded-[15px]" />
              <img src="images/home4.jpg" alt="" className="rounded-[15px]" />
            </div>
            <div className="  space-y-7 pt-[13vh]">
              <img src="images/home1.jpg" alt="" className="rounded-[15px]" />
              <img src="images/home3.jpg" alt="" className="rounded-[15px]" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mt-8">
          Why <span className="text-orange-600"> Choose Us</span>
        </h1>
      </div>
      <div className="grid lg:mx-24 md:mx-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center mt-4 gap-y-5 ">
        {serviceData.map((service, index) => (
          <HomeServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
