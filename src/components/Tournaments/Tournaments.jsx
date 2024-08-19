import { useState } from 'react'
import React from 'react'
import DatePicker from './DatePicker';
import SelectField from './SelectField';
import { IoSearchOutline } from "react-icons/io5";
import TournamentCard from './TournamentCard';

function Tournaments() {

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
        <div className='flex justify-center  '>
          <img src="images/tournament.jpg" alt="" className='w-full h-[52vh]' />
          <div className="absolute w-full h-[52vh] bg-black bg-opacity-40"></div>
          <h1 className='absolute top-[27vh] text-[5vh] text-white font-bold'>Tournaments</h1>
          <div className='absolute top-[54vh] w-[93%] h-28 flex flex-row justify-evenly items-center gap-14 bg-white drop-shadow-lg rounded-lg'>
            <div className='flex flex-col w-full md:w-[25%]'>
              <label htmlFor="search" className="text-md font-medium text-gray-700 mb-1">
                Search for
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Event title..."
                className="w-full px-4 py-[5px] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700"
              />
            </div>

            <div className='w-full md:w-[25%] relative'>
              <SelectField required={true} label="Where" placeholder="Any Where" id="where_search" name="where_search" Searchable={true} options={options1} />
            </div>

            <div className='w-full md:w-[25%]'>
              <DatePicker />
            </div>
            <button className='flex items-center justify-center w-14 h-14 rounded-lg bg-orange-600 text-white'><IoSearchOutline size={25} /></button>
          </div>
        </div>

        <div className='mt-24 mx-14'>
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
            <button className='bg-orange-600 w-40 h-12 rounded-lg flex-shrink-0 text-white font-medium'>Filter</button>
          </div>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-items-center mt-12 gap-y-12'>
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />

          </div>
        </div>




      </div>
    </>
  )
}

export default Tournaments