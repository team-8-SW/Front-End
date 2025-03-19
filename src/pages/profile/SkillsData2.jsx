import { Typography } from "@material-tailwind/react";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const SkillsData2 = ({ skill}) => {


  return (
    <div>
      <div className="flex flex-col gap-2 mt-3">
        <Typography variant="h6" className="font-medium text-gray-800">
          {skill}
        </Typography>
       
      <hr className="border-t border-gray-300 my-2" />
    </div>
    </div>
  );
};

export default SkillsData2;
