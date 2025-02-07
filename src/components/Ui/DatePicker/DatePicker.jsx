import React from "react";

function DatePicker({ value, onChange, label }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="mb-1 text-md font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id="date"
        placeholder="Any date"
        className="w-[12vh] md:w-[19vh] lg:w-full sm:w-[12vh] px-4 py-[5px] border border-black rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700 hover:border-[rgb(255,140,0)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DatePicker;
