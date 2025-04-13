import { Typography } from "@material-tailwind/react";
import React from "react";

const SkillsData2 = ({ skill }) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <Typography variant="h6" className="font-medium text-gray-800">
        {typeof skill === "string" ? skill : skill.skillName}
      </Typography>
      <hr className="border-t border-gray-300 my-2" />
    </div>
  );
};

export default SkillsData2;
