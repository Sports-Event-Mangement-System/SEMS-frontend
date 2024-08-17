import React from 'react';
import Select from 'react-select';

function SelectField({ label, placeholder, required, id, name, Searchable, options }) {

    return (
        <div className="flex flex-col relative">
            <label htmlFor="dropdown" className="mb-1 text-md font-medium text-gray-700">
                {label} {required && <span className="text-red-500 text-md">*</span>}
            </label>
            <div className="relative">
                <Select
                    menuPortalTarget={document.body} 
                    isSearchable={Searchable}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    options={options}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded-t-lg focus:outline-none"
                >
                </Select>
            </div>
        </div>
    );
}

export default SelectField;
