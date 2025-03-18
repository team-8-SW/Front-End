import { Typography } from '@material-tailwind/react';
import React from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { PiBagSimpleBold } from "react-icons/pi";

const ExpData2 = ({ experiences, userId, onDelete }) => {
  

  return (
    <div className="flex justify-between mt-3">
      <div className='flex gap-2'>

<div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
              <span className="text-gray-500 text-lg"><PiBagSimpleBold/></span> {/* Placeholder Icon */}
            </div>

      
      <div className="flex flex-col">
        <Typography variant="h6" className="font-medium text-gray-800">
          {experiences.title} .
        </Typography>
        <Typography variant="text" className="text-gray-600">
          {experiences.company}     . {experiences.employmentType}                    
        </Typography>
        <Typography variant="small" className="text-gray-600">
        {experiences.startDate} - {experiences.current ? "Present" : experiences.endDate}
        </Typography>
        <Typography variant="small" className="text-gray-600">
          {experiences.location} . {experiences.locationType}
        </Typography>
        <Typography variant="small" className="text-gray-600">
          {experiences.description}
        </Typography>

      </div>
      </div>
      <div className="flex gap-2">
        {/* <button className="text-gray-600 hover:text-gray-800">
          <PencilIcon className="w-5 h-5" />
        </button> */}
        
      </div>
    </div>
  );
};

export default ExpData2;
