import { Typography } from "@material-tailwind/react";
import React from "react";
import { PiCertificateBold } from "react-icons/pi";

const SkillsData3 = ({ skill }) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        {/* <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
          <PiCertificateBold className="text-gray-500 text-xl" />
        </div> */}

        <div>
          <Typography variant="h6" className="font-medium text-gray-800">
            {skill.skillName}
          </Typography>

{/* {skill.contexts?.length > 0 && (
            <div className="mt-1 space-y-1">
              {skill.contexts.map((ctx, idx) => (
                <Typography key={idx} variant="small" className="text-gray-600">
                  {ctx.schoolName ? `${ctx.schoolName}` : ""}{" "}
                  {ctx.schoolName && ctx.companyName && "·"}{" "}
                  {ctx.companyName ? `${ctx.companyName}` : ""}
                </Typography>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
          
export default SkillsData3;
