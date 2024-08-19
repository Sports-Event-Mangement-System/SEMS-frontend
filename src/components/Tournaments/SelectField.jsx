import React from 'react';
import Select from 'react-select';

function SelectField({ label, placeholder, required, id, name, Searchable, options }) {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'rgb(255, 140, 0)' : 'border-gray-300',
            boxShadow: state.isFocused ? '0 0 0 1px rgb(255, 140, 0)' : 'none',
            '&:hover': {
                borderColor: 'rgb(255, 140, 0)',
            },
            '&:focus': {
                borderColor: 'rgb(255, 140, 0)',
            },
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    return (
        <div className="flex flex-col relative">
            <label htmlFor={id} className="mb-1 text-md font-medium text-gray-700">
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
                    className="w-full"
                    styles={customStyles}
                    classNamePrefix="custom-select"
                />
            </div>
        </div>
    );
}

export default SelectField;

