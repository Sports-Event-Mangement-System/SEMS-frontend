import React from "react";
import Select from "react-select";

function SelectField({
  label,
  placeholder,
  required,
  id,
  name,
  searchable,
  options,
  value,
  onChange,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "rgb(255, 140, 0)" : "rgb(209, 213, 219)",
      boxShadow: state.isFocused ? "0 0 0 1px rgb(255, 140, 0)" : "none",
      "&:hover": {
        borderColor: "rgb(255, 140, 0)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(255, 140, 0)" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "rgb(255, 140, 0)" : "rgba(255, 140, 0, 0.1)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the dropdown is above the modal
    }),
  };

  const selectedOption =
    Array.isArray(options) && options.length
      ? options.find((option) => option.value === value)
      : null;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={id} className="mb-1 text-md font-medium text-gray-700">
        {label} {required && <span className="text-red-500 text-md">*</span>}
      </label>
      <div className="relative">
        <Select
          menuPortalTarget={document.body} // Render the menu in the body
          menuPosition="fixed" // Use fixed positioning
          isSearchable={searchable}
          name={name}
          id={id}
          placeholder={placeholder}
          options={options}
          value={value ? value : selectedOption}
          onChange={onChange}
          className="w-full"
          styles={customStyles}
          classNamePrefix="custom-select"
        />
      </div>
    </div>
  );
}

export default SelectField;