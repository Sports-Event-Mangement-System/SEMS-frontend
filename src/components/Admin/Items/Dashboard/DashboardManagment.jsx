import React, { useState } from 'react'
import Card from '../../../Ui/Card/Card'
import { FaTrophy } from "react-icons/fa6";

export default function DashboardManagment() {
  return (
    <>
      <div className='flex justify-evenly'>

        <Card>
          <div className='m-4'>
            <div className='text-gray-500 font-medium text-base text-center'>TOTAL TOURNAMENT</div>
            <div className='flex gap-5 mr-48'>
              <div className='bg-gray-300 p-2 h-fit w-fit rounded-md'><FaTrophy size={24} /></div>
              <h1 className='text-2xl font-medium'>122</h1>
            </div>
          </div>

        </Card>
        <Card>
          <div className='m-4'>
            <div className='text-gray-500 font-medium text-base text-center'>TOTAL TOURNAMENT</div>
            <div className='flex gap-5 mr-48'>
              <div className='bg-gray-300 p-2 h-fit w-fit rounded-md'><FaTrophy size={24} /></div>
              <h1 className='text-2xl font-medium'>122</h1>
            </div>
          </div>

        </Card>
        <Card>
          <div className='m-4'>
            <div className='text-gray-500 font-medium text-base text-center'>TOTAL TOURNAMENT</div>
            <div className='flex gap-5 mr-48'>
              <div className='bg-gray-300 p-2 h-fit w-fit rounded-md'><FaTrophy size={24} /></div>
              <h1 className='text-2xl font-medium'>122</h1>
            </div>
          </div>

        </Card>

      </div>
    </>
  )
}
