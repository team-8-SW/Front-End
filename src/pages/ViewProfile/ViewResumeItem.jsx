import React from "react";
import { Typography } from "@material-tailwind/react";
import { HiOutlineDocument } from "react-icons/hi";

const ViewResumeItem = ({ url }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded">
        <HiOutlineDocument className="text-gray-500 w-5 h-5" />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Resume
      </a>
    </div>
  );
};

export default ViewResumeItem;
