import { useEffect, useState } from 'react'
import React from 'react'
import DatePicker from './../Ui/DatePicker/DatePicker';
import SelectField from './../Ui/SelectField/SelectField';
import { IoSearchOutline } from "react-icons/io5";
import TournamentCard from './TournamentCard';
import axios from 'axios';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tournamentsPerPage = 4;

  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const handleNext = () => {
    if (indexOfLastTournament < tournaments.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return !isNaN(date) ? date.toLocaleDateString(undefined, options) : "Invalid date";
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/tournaments`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        console.log(response);
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    };

    fetchData();
  }, []);





  const [searchTerm, setSearchTerm] = useState('');
  const options1 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' }
  ];
  return (
    <>
      <div >
        <div className='relative flex justify-center mb-24'>
          <img src="images/tournament.jpg" alt="" className='w-full h-[52vh]' />
          <div className="absolute w-full h-[52vh] bg-black bg-opacity-40"></div>
          <h1 className='absolute top-0 transform translate-y-[20vh] text-[5vh] text-white font-bold'>Tournaments</h1>
          <span className="absolute top-0 w-[93%] transform translate-y-[44vh] bg-white h-28 flex flex-wrap justify-evenly items-center gap-4 md:gap-14 drop-shadow-lg rounded-lg">
            <div className="flex flex-col w-full md:w-[25%]">
              <label htmlFor="search" className="text-md font-medium text-gray-700 mb-1">
                Search for
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Event title..."
                className="w-full px-4 py-[5px] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700 hover:border-[rgb(255,140,0)]"
              />
            </div>

            <div className="w-full md:w-[25%] relative">
              <SelectField required={true} label="Where" placeholder="Any Where" id="where_search" name="where_search" Searchable={true} options={options1} />
            </div>

            <div className="w-full md:w-[25%]">
              <DatePicker />
            </div>

            <button className="flex items-center justify-center w-14 h-14 rounded-lg bg-orange-600 text-white hover:bg-orange-500">
              <IoSearchOutline size={25} />
            </button>
          </span>

        </div>

        <div className='mx-14'>
          <h1 className="text-md font-medium text-gray-700 mb-0">Advanced Search</h1>
          <div className='flex items-end justify-between mt-7'>
            <div className='w-full md:w-[15%] relative'>
              <SelectField label="Sort by" placeholder="Event Date" id="sort_by" name="sort_by" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <SelectField label="Status" id="status" name="status" placeholder="Any Status" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <SelectField label="Event Type" id="event_type" name="event_type" placeholder=" Any Type" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <SelectField label="Price" id="Price" name="Price" placeholder="Any Price" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <SelectField label="Category" id="category" name="category" placeholder="All" />
            </div>
            <button className='bg-orange-600 w-40 h-12 rounded-lg flex-shrink-0 text-white font-medium hover:bg-orange-500'>Filter</button>
          </div>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-items-center mt-12 gap-y-12'>
            {currentTournaments.map((details, index) => (
              <TournamentCard
                key={index}
                t_images={details.t_images}
                image={details.image_urls}
                tournament_name={details.t_name}
                team_num={details.team_number}
                address={details.address}
                reg_start={formatDate(details.rs_date)}
                reg_end={formatDate(details.re_date)}
                price={details.prize_pool}
                id={details.id}
              />
            ))}
          </div>
          <div className='flex justify-between mt-8'>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className='px-3 py-2 flex items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <IoMdArrowRoundBack /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={indexOfLastTournament >= tournaments.length}
              className='px-3 py-2 flex items-center gap-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next <IoMdArrowRoundForward />
            </button>
          </div>
        </div>




      </div>
    </>
  )
}

export default Tournaments