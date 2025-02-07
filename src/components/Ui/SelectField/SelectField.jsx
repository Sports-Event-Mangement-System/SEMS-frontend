import React, { useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        backgroundColor: state.isSelected
          ? "rgb(255, 140, 0)"
          : "rgba(255, 140, 0, 0.1)",
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPlaceholderText = () => {
    if (!placeholder) return "";

    if (windowWidth < 660) return "";
    if (windowWidth < 679) return placeholder.substring(0, 2) + "..."; // Small screens
    if (windowWidth < 768) return placeholder.substring(0, 5) + "..."; // Small screens
    if (windowWidth < 1168) return placeholder.substring(0, 8) + "..."; // Medium screens
    return placeholder; // Large screens
  };

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
          placeholder={getPlaceholderText()}
          options={options}
          value={value ? value : selectedOption}
          onChange={onChange}
          className="w-[12vh] md:w-[19vh] lg:w-full sm:w-[12vh] border border-black rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[rgb(255,140,0)] focus:border-[rgb(255,140,0)] text-gray-700 hover:border-[rgb(255,140,0)]"
          styles={customStyles}
          classNamePrefix="custom-select"
        />
      </div>
    </div>
  );
}

export default SelectField;
