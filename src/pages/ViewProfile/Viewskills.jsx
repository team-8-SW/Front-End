import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import SkillsData3 from "./SkillsData3";

const ViewSkills = ({ skills }) => {
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    setSkillList(skills || []);
  }, [skills]);

  return (
    <div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-semibold text-gray-900">
            Skills
          </Typography>
        </div>

        {/* Skills List */}
        {skillList.length > 0 ? (
          skillList.map((skill, index) => (
            <div key={index}>
              <SkillsData3 skill={skill} />
              {index !== skillList.length - 1 && <hr className="my-2 border-gray-300" />}
            </div>
          ))
        ) : (
          <Typography color="gray" className="text-sm">No skills added.</Typography>
        )}
      </Card>
    </div>
  );
};

export default ViewSkills;
