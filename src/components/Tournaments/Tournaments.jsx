import { useEffect, useState } from "react";
import React from "react";
import DatePicker from "./../Ui/DatePicker/DatePicker";
import SelectField from "./../Ui/SelectField/SelectField";
import TournamentCard from "./TournamentCard";
import axios from "axios";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerPage, setSelectedPerPage] = useState(4);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const indexOfLastTournament = currentPage * selectedPerPage;
  const indexOfFirstTournament = indexOfLastTournament - selectedPerPage;

  const perPageOptions = [3, 6, 9, 12];

  const featuredOptions = [
    { value: "Featured", label: "Featured" },
    { value: "Not Featured", label: "Not Featured" },
  ];

  const eventTypeOptions = [
    { value: "Single Elimination", label: "Single Elimination" },
    { value: "Round Robin", label: "Round Robin" },
  ];

  // Filter tournaments based on search term
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesEventType = selectedEventType
      ? selectedEventType.value === "Single Elimination"
        ? tournament.tournament_type === "single-elimination"
        : tournament.tournament_type === "round-robin"
      : true;

    const matchesFeatured = selectedFeatured
      ? selectedFeatured.value === "Featured"
        ? tournament.featured === 1
        : tournament.featured === 0
      : true;

    const matchesSearchQuery = tournament.t_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesYear = selectedYear
      ? new Date(tournament.rs_date).getFullYear() === selectedYear
      : true;

    const matchesMonth = selectedMonth
      ? new Date(tournament.rs_date).getMonth() + 1 === selectedMonth // Adjusting for zero-indexed month
      : true;

    return (
      matchesEventType &&
      matchesSearchQuery &&
      matchesFeatured &&
      matchesYear &&
      matchesMonth
    );
  });

  const currentTournaments = filteredTournaments.slice(
    indexOfFirstTournament,
    indexOfLastTournament
  );

  const handleNext = () => {
    if (indexOfLastTournament < filteredTournaments.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePerPageChange = (e) => {
    setSelectedPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return !isNaN(date)
      ? date.toLocaleDateString(undefined, options)
      : "Invalid date";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/active/tournaments`
        );
        setTournaments(response.data.tournaments);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const resetFilters = () => {
    setSelectedEventType(null);
    setSelectedFeatured(null);
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedDate("");
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <div className="relative flex justify-center mb-24">
          <img src="images/tournament.jpg" alt="" className="w-full h-[52vh]" />
          <div className="absolute w-full h-[52vh] bg-black bg-opacity-40"></div>
          <h1 className="absolute top-0 transform translate-y-[20vh] text-[5vh] text-white font-bold">
            Tournaments
          </h1>

          <span className="absolute top-0 w-[93%] transform translate-y-[44vh] bg-white h-auto py-6 flex justify-center items-center gap-4 md:gap-3 drop-shadow-lg rounded-lg">
            <div className="flex flex-wrap w-full gap-3 sm:gap-3 md:gap-3 lg:gap-6 px-10 justify-center h-fit py-2 items-center">
              <div className="w-fit flex flex-col sm:w-fit md:w-[20%]">
                <label
                  htmlFor="search"
                  className="text-md font-medium text-gray-700 mb-1"
                >
                  Search for
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Event title..."
                  className=" px-4 py-[5px] w-[75px] md:w-[132px] lg:w-full sm:w-[110px] border border-black rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700 hover:border-[rgb(255,140,0)]"
                />
              </div>

              <div className="w-fit md:w-[20%]">
                <SelectField
                  label="Featured"
                  id="featured"
                  name="featured"
                  placeholder="Featured "
                  options={featuredOptions}
                  value={selectedFeatured}
                  onChange={(option) => setSelectedFeatured(option)}
                />
              </div>
              <div className="w-fit md:w-[20%]">
                <SelectField
                  label="Event Type"
                  id="event_type"
                  name="event_type"
                  placeholder="Event Type"
                  options={eventTypeOptions}
                  value={selectedEventType}
                  onChange={(option) => setSelectedEventType(option)}
                />
              </div>
              <div className="w-fit md:w-[20%]">
                <DatePicker
                  value={selectedDate}
                  label="When"
                  onChange={(dateString) => {
                    setSelectedDate(dateString);
                    const selectedDateObj = new Date(dateString);
                    setSelectedYear(selectedDateObj.getFullYear());
                    setSelectedMonth(selectedDateObj.getMonth() + 1);
                  }}
                />
              </div>
              <div>
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center w-fit h-fit px-2 py-1 rounded-lg bg-orange-600 text-white hover:bg-orange-500"
                >
                  Reset
                </button>
              </div>
            </div>
          </span>
        </div>

        <div className="mx-14">
          <h1 className="text-3xl font-bold">Tournament List</h1>

          {currentTournaments.length === 0 ? (
            <p className="text-xl text-center font-semibold text-gray-700 mt-6">
              No tournaments found.
            </p>
          ) : (
            <div className="lg:mx-11 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center mt-12 gap-y-12">
              {currentTournaments.map((details, index) => (
                <TournamentCard
                  key={index}
                  t_images={details.t_images}
                  image={details.image_urls}
                  tournament_name={details.t_name}
                  min_teams={details.min_teams}
                  max_teams={details.max_teams}
                  address={details.address}
                  reg_start={formatDate(details.rs_date)}
                  reg_end={formatDate(details.re_date)}
                  price={details.prize_pool}
                  id={details.id}
                  featured={details.featured}
                  format={details.tournament_type}
                />
              ))}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <div className="flex items-center text-xs">Card per page</div>
            <select
              value={selectedPerPage}
              onChange={handlePerPageChange}
              className="border-2 border-gray-500
               rounded-md px-2 cursor-pointer"
            >
              {perPageOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-2 flex items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoMdArrowRoundBack />
            </button>
            <button
              onClick={handleNext}
              disabled={indexOfLastTournament >= filteredTournaments.length}
              className="px-3 py-2 flex items-center gap-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoMdArrowRoundForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tournaments;
