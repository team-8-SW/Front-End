import React, { useState, useRef, useEffect } from "react";

const FilterDropDown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  const toggleOption = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="border rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-100"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white border rounded shadow w-64 p-4">
          <div className="font-semibold text-sm mb-3">Select {label}:</div>
          {options.map((option) => (
            <label key={option} className="flex items-center mb-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}

          <div className="flex justify-between pt-3">
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={() => setSelected([])}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-sm bg-blue-600 text-white px-4 py-1 rounded"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
