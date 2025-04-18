import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import ExpData3 from "./ExpData3";

const ViewExp = ({ experiences }) => {
  const [experienceList, setExperienceList] = useState([]);

  useEffect(() => {
    setExperienceList(experiences || []);
  }, [experiences]);

  return (
    <div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-semibold text-gray-900">
            Experience
          </Typography>
        </div>

        {/* Experience Entries */}
        {experienceList.length > 0 ? (
          experienceList.map((exp, index) => (
            <div key={index}>
              <ExpData3 experiences={exp} />
              {index !== experienceList.length - 1 && (
                <hr className="my-4 border-t border-gray-200" />
              )}
            </div>
          ))
        ) : (
          <Typography color="gray" className="text-sm">
            No experience added.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default ViewExp;
