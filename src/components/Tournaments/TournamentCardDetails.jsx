import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import TournamentDetailsContent from "./TournamentDetailsContent";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function TournamentCardDetails() {
  const [toggle, setToggle] = useState(1);
  const [tournamentData, setTournamentData] = useState(null); // Initially null to handle loading state
  const [teamData, setTeamData] = useState([]); // Initially null to handle loading state

  const { id } = useParams();

  const toggleTab = (index) => {
    setToggle(index);
  };

  const fetchTournamentData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/show/tournament/${id}`
      );
      setTournamentData(response.data.tournament);
    } catch (error) {
    }
  };

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/teams/tournament/${id}`
      );
      setTeamData(response.data.teams);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchTournamentData();
    fetchTeamData();
  }, [id]);

  if (!tournamentData) {
    return <div className="h-screen">Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return !isNaN(date)
      ? date.toLocaleDateString(undefined, options)
      : "Invalid date";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[83%] bg-gray-200 h-fit space-y-9 pb-8">
        {tournamentData.image_urls.length > 1 ? (
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              autoplay: true,
              interval: 3000,
              pagination: true,
              arrows: true,
              pauseOnHover: false,
            }}
            aria-label="Tournament Images"
          >
            {tournamentData.image_urls.map((url, index) => (
              <SplideSlide key={index}>
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[70vh] object-top object-cover"
                />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <img
            src={tournamentData.image_urls[0] || "/images/tournament.jpg"}
            alt="Tournament"
            className="w-full h-[70vh] object-top object-cover"
          />
        )}

        <div className="flex justify-between px-16 items-center">
          <div className="space-y-1">
            <h1 className="font-bold sm:text-xl lg:text-4xl md:text-2xl text-orange-600">
              {tournamentData.t_name}
            </h1>
            <h2 className="font-bold sm:text-sm md:text-base lg:text-lg">
              Registration Date:
              <span className="font-medium">
                {formatDate(tournamentData.rs_date)} to{" "}
                {formatDate(tournamentData.re_date)}
              </span>
            </h2>
            <h2 className="font-bold sm:text-sm md:text-base lg:text-lg">
              Start Date:{" "}
              <span className="font-medium">
                {" "}
                {formatDate(tournamentData.ts_date)} to{" "}
                {formatDate(tournamentData.te_date)}
              </span>
            </h2>
            <h2 className="font-bold sm:text-sm md:text-base lg:text-lg">
              Location:{" "}
              <span className="font-medium"> {tournamentData.address}</span>
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <h1 className="font-bold sm:text-base md:text-lg lg:text-xl flex items-end">
              Prize Pool: <MdCurrencyRupee size={22} />{" "}
              {tournamentData.prize_pool}
            </h1>

            {new Date(tournamentData.re_date) <= new Date() ? (
              <span className="font-semibold sm:text-base md:text-lg lg:text-xl text-red-600">
                Registration End
              </span>
            ) : tournamentData.team_register >= tournamentData.max_teams ? (
              <span className="font-semibold sm:text-base md:text-lg lg:text-xl text-red-600">
                Team Full
              </span>
            ) : (
              <button className="h-fit w-fit border-2 bg-orange-600 border-transparent  px-3 py-1 rounded-lg font-semibold text-white hover:border-white">
                <NavLink to="addTeam" state={{ tournamentData }}>
                  <div className="flex text-xs md:text-base lg:text-lg sm:text-xs items-center gap-1">
                    Register Now
                  </div>
                </NavLink>
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-400 h-1 w-[95%] items-center mx-auto"></div>

        <div className="grid grid-cols-5">
          <div
            className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:text-orange-600 ${
              toggle === 1 ? "text-orange-600" : ""
            }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTab(1)}>
              OVERVIEW
            </span>
          </div>
          <div
            className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:text-orange-600 ${
              toggle === 2 ? "text-orange-600" : ""
            }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTab(2)}>
              INFORMATION
            </span>
          </div>
          <div
            className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:text-orange-600 ${
              toggle === 3 ? "text-orange-600" : ""
            }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTab(3)}>
              PARTICIPANT
            </span>
          </div>
          <div
            className={`flex justify-center items-center border-r-2 border-r-orange-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:text-orange-600 ${
              toggle === 4 ? "text-orange-600" : ""
            }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTab(4)}>
              {tournamentData.tournament_type === "single-elimination"
                ? "TIESHEET"
                : "TABLE"}
            </span>
          </div>
          <div
            className={`flex justify-center items-center font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:text-orange-600 ${
              toggle === 5 ? "text-orange-600" : ""
            }`}
          >
            <span className="cursor-pointer" onClick={() => toggleTab(5)}>
              FIXTURES
            </span>
          </div>
        </div>
      </div>

      <div className="w-[83%] h-fit mt-16">
        <TournamentDetailsContent
          tabIndex={toggle}
          tournamentData={tournamentData}
          teamData={teamData}
        />
      </div>
    </div>
  );
}
