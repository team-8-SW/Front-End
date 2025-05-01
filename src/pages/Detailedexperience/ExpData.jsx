import { Typography } from '@material-tailwind/react';
import React from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";
import { PiBagSimpleBold } from "react-icons/pi";
import { handleDeleteExp } from "../../services/profile";

// Function to format date to 'MMM YYYY' format
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short"
  });
};

const ExpData = ({ experiences, userId, onDelete }) => {
  const handleDelete = () => {
    handleDeleteExp(experiences.id, userId, onDelete); // Pass experience ID for deletion
  };

  return (
    <div className="flex justify-between mt-3 p-4 border-b border-gray-200">
      <div className="flex gap-2 w-full">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
          <span className="text-gray-500 text-lg"><PiBagSimpleBold /></span>
        </div>

        <div className="flex flex-col flex-grow">
          <Typography variant="h6" className="font-medium text-gray-800">
            {experiences.position || "Untitled Role"}
          </Typography>

          <Typography variant="small" className="text-gray-600">
            {experiences.companyName || "Company"} · {experiences.employmentType || "N/A"}
          </Typography>

          <Typography variant="small" className="text-gray-600">
            {formatDate(experiences.startDate)} -{" "}
            {experiences.currentJob ? "Present" : formatDate(experiences.endDate) || "N/A"}
          </Typography>

          <Typography variant="small" className="text-gray-600">
            {experiences.location || "Location not specified"} 
          </Typography>

          {experiences.description && (
            <Typography variant="small" className="text-gray-600">
              {experiences.description}
            </Typography>
          )}
        </div>
        
        {/* Delete Button */}
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExpData;
