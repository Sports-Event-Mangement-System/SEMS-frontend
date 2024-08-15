import React, { useState } from 'react';

function DropdownWithSearch({ title = "Select", placeholder = "Select an option", buttonClassName = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const options = [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
    ];

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col relative">
            <label htmlFor="dropdown" className="mb-1 text-md font-medium text-gray-700">
                {title}
            </label>
            <div className="relative">
                <button
                    id="dropdown"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 border-gray-300 bg-white text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${buttonClassName}`}
                    style={{ zIndex: isOpen ? 99999 : 1, position: 'relative' }}  // Ensure high z-index when open
                >
                    {selectedItem || placeholder}
                    <svg
                        className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div
                        className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                        style={{ zIndex: 99999, position: 'absolute', top: '100%', left: 0 }}
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border-b border-gray-300 rounded-t-lg focus:outline-none"
                        />
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedItem(option);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DropdownWithSearch;
