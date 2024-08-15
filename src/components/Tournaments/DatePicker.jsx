import React from 'react';

function DatePicker() {

    return (
        <div className='flex flex-col'>
            <label htmlFor="date" className="mb-1 text-md font-medium text-gray-700">
                When
            </label>
            <input
                type="date"
                id="date"
                placeholder='Any date'
                className=" px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
        </div >
    );
}

export default DatePicker;
