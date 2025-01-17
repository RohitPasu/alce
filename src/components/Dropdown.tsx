import { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, value, onChange, className = '', showArrow = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`h-full w-full p-2 mb-4 border rounded bg-white text-left font-mono flex items-center justify-between px-4 ${className}`}
      >
        <span>{value || "Select a source"}</span>
        {showArrow && <span className="ml-2">&#9662;</span>}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="p-2 hover:bg-gray-200 cursor-pointer font-mono"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
