import { Typography } from "@material-tailwind/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const formatDate = (isoDate) => {
  if (!isoDate) return "Present";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const EduData3 = ({ edu }) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-3">
        <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
          <FaGraduationCap className="text-gray-600 text-xl" />
        </div>

        <div className="flex flex-col">
          <Typography variant="h6" className="font-medium text-gray-800">
            {edu.universityName}
          </Typography>
          <Typography className="text-gray-700">
            {edu.degree} Degree
          </Typography>
          <Typography className="text-sm text-gray-600">
            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
          </Typography>

          {/* Skills */}
          {edu.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {edu.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EduData3;
