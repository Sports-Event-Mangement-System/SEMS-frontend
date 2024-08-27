import React, { useState } from 'react'

export default function TournamentManagement() {

  const [btnStatus, setBtnStatus] = useState(false)
  const [btnText, setBtnText] = useState('Active');

  const handleBtnStatus = () => {
    setBtnStatus((prev) => !prev);
    setBtnText((prev) => prev === "Active" ? "InActive" : "Active");
  } 

  const handleDelete = () => {
    console.log("Btn clicked");
  }


  return (
    <>
        <div className='p-4 w-full shadow-2xl'>
          <button className='focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800'>+ Add</button>
          <table className='table-auto w-full'>
            <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3 text-start'>S.N.</th>
                <th className='px-6 py-3 text-start'>Heading1</th>
                <th className='px-6 py-3 text-start'>Heading2</th>
                <th className='px-6 py-3 text-start'>Heading3</th>
                <th className='px-6 py-3 text-start'>Heading4</th>
                <th className='px-6 py-3 text-start'>Heading5</th>
                <th className='px-6 py-3 text-start'>Status</th>
                <th className='px-6 py-3 text-start'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <tr scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start">
                <td className='px-6 py-3'>1</td>
                <td className='px-6 py-3'>Item1</td>
                <td className='px-6 py-3'>Item2</td>
                <td className='px-6 py-3'>Item3</td>
                <td className='px-6 py-3'>Item4</td>
                <td className='px-6 py-3'>Item5</td>
                <td className='px-6 py-3'>
                  <button className={`bg-blue-600 text-white rounded-xl w-20 py-2 
                  ${btnStatus ? 'bg-red-600' : ''}`} onClick={handleBtnStatus}>{btnText}</button></td>
                <td>
                  <div className='flex gap-2'>
                    <button className='bg-green-600 text-white rounded-xl w-14 py-2'>Edit</button>
                    <button className='bg-red-600 text-white rounded-xl w-16 py-2' onClick={handleDelete}>Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </>
  )
}
