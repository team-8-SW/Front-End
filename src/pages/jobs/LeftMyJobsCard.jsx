import React from "react";
import { BookmarkIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const LeftMyJobsCard = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full font-[system-ui] text-[16px]">
      <Typography variant="h6" className="flex items-center gap-2 mb-3 text-[16px]">
        <BookmarkIcon className="w-5 h-5 text-gray-700" />
        My items
      </Typography>

      <div className="border-t pt-2">
        <div className="flex justify-between text-sm px-2 py-2 rounded hover:bg-gray-100 cursor-pointer font-[500]">
          <span>Posted jobs</span>
          <span className="text-blue-600 font-semibold">8</span>
        </div>
        <div className="flex justify-between text-sm px-2 py-2 rounded hover:bg-gray-100 cursor-pointer font-[500]">
          <span>My jobs</span>
          <span className="text-blue-600 font-semibold">1</span>
        </div>
      </div>
    </div>
  );
};

export default LeftMyJobsCard;
