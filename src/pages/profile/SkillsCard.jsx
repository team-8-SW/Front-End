import React from "react";
import { useState } from "react";
import {
  Card,
  Typography,Button
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const SkillsCard = () => {
    const [skills, setskills] =useState([]);
  return (<div>
    {skills.length > 0 ? (<div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Typography className="font-semibold text-gray-900 text-[20px]" style={{ color: "#000000E6" }}>
            Skills
          </Typography>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800">
              <PlusIcon className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Skills List */}
        <div className="mt-4">
          <Typography
          style={{ color: "#000000E6" }}
            as="a"
            href="#"
            className="text-black-600 hover:underline text-[16px] font-medium block "
          >
            Public Trust
          </Typography >
          <hr className="border-t border-gray-300 my-2" />
        </div>

        {/* Show More */}
        <div className="mt-3">
          <Typography
            as="a"
            href="#"
            className="text-gray-600 hover:underline text-[14px] block"
          >
            Show all 4 skills →
          </Typography>
        </div>
      </Card>
    </div>)
    :
    (<div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Typography className="font-semibold text-gray-900 text-[20px]" style={{ color: "#000000E6" }}>
            Skills
          </Typography>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800">
              <PlusIcon className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Skills List */}
        <div className="mt-4">
          <Typography
        
            variant="h6"
           
            className="text-gray-400  text-[16px]  "
          >
            Public Trust
          </Typography >
          <hr className="border-t border-gray-300 my-2" />
          <Typography
        
        variant="h6"
       
        className="text-gray-400  text-[16px]  "
      >
        Public Trust
      </Typography >
      <hr className="border-t border-gray-300 my-2" />

        </div>

        {/* Show More */}
        <div className="mt-3">
           <Button variant="outlined" color="blue">add skills</Button>
        </div>
      </Card>
    </div>)}
  </div>
    
  );
};

export default SkillsCard;