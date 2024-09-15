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
                className="px-4 py-[5px] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700 hover:border-[rgb(255,140,0)]"

            />
        </div >
    );
}

export default DatePicker;
