import { useState } from 'react'
import React from 'react'
import DatePicker from './DatePicker';
import DropdownWithSearch from './DropdownWithSearch';
import { IoSearchOutline } from "react-icons/io5";

function Tournaments() {

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <div className='h-screen'>
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
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className='w-full md:w-[25%] relative'>
              <DropdownWithSearch title="Where" placeholder="Any Where" buttonClassName="border-b-2" />
            </div>

            <div className='w-full md:w-[25%]'>
              <DatePicker />
            </div>
            <div className='flex items-center justify-center w-14 h-14 rounded-lg bg-orange-600 text-white'><IoSearchOutline size={25} /></div>
          </div>
        </div>

        <div className='mt-24 mx-14'>
          <h1 className="text-md font-medium text-gray-700 mb-0">Advanced Search</h1>
          <div className='flex items-end justify-between mt-7'>
            <div className='w-full md:w-[15%] relative'>
              <DropdownWithSearch title="Sort by" placeholder="Event Date" buttonClassName="border rounded-lg" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <DropdownWithSearch title="Status" placeholder="Any Status" buttonClassName="border rounded-lg" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <DropdownWithSearch title="Event Type" placeholder=" Any Type" buttonClassName="border rounded-lg" />
            </div>  <div className='w-full md:w-[15%] relative z-10'>
              <DropdownWithSearch title="Price" placeholder="Any Price" buttonClassName="border rounded-lg" />
            </div>  <div className='w-full md:w-[15%] relative'>
              <DropdownWithSearch title="Category" placeholder="All" buttonClassName="border rounded-lg" />
            </div>
            <button className='bg-orange-600 w-40 h-12 rounded-lg flex-shrink-0 text-white font-medium'>Filter</button>
          </div>

        </div>




      </div>
    </>
  )
}

export default Tournaments