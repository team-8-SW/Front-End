import { Typography } from '@material-tailwind/react';
import React from 'react';
import { PiBagSimpleBold } from "react-icons/pi";

const ExpData3 = ({ experiences }) => {
  const {
    position,
    companyName,
    employmentType,
    startDate,
    endDate,
    current,
    location,
    locationType,
    description
  } = experiences;

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="flex justify-between mt-5">
      <div className='flex gap-4'>
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
          <span className="text-gray-500 text-xl">
            <PiBagSimpleBold />
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Typography variant="h6" className="font-semibold text-gray-800">
            {position || "Untitled Position"}
          </Typography>
          <Typography variant="small" className="text-gray-700">
            {companyName || "Company"} {employmentType ? `· ${employmentType}` : ""}
          </Typography>
          <Typography variant="small" className="text-gray-600">
            {formatDate(startDate)} - {current ? "Present" : formatDate(endDate)}
          </Typography>
          <Typography variant="small" className="text-gray-600">
            {location || "Location not set"} {locationType ? `· ${locationType}` : ""}
          </Typography>
          {description && (
            <Typography variant="small" className="text-gray-600 mt-1">
              {description}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpData3;
