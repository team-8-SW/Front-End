import React, { useState, useEffect } from "react";
import { PlusIcon ,PencilIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import SkillsData3 from "./SkillsData3";
import { FaArrowLeft } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const ViewSkills = ({ loggedUser }) => {
  const [skills, setSkills] = useState(loggedUser?.skills || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const handleSkillAdded = (newSkill) => {
    setSkills([...skills, newSkill]); // Update UI
  };

  useEffect(() => {
    setSkills(loggedUser?.skills || []);
  }, [loggedUser]);
  const displayedSkills = showAll ? skills : skills.slice(0, 2);
  

  if (!loggedUser) return <p>Loading user data...</p>;

  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              
                <Typography variant="h3" className="font-medium text-gray-800">
                  Skills
                </Typography>
                
            </div>

            {/* Display Skills */}
            <div>
              
              {skills.length > 0 ? (
                                displayedSkills.map((skill, index) => (
                  <SkillsData3 key={index} skill={skill} />
                ))
                
                
                
              ) : (
               <Typography color="gray">No Skills Added</Typography>
                
              )}
            </div>
            {skills.length > 2 && (
<Link to="/skills" className="text-center">
              <button
               
                className="text-gray-700 font-medium text-sm mt-2 hover:underline flex items-center justify-center text-center"
              >
                {showAll ? "Show less" : `Show all ${skills.length} skills →`}
              </button>
              </Link>
            )}
          </div>
        </Card>
      </div>
     
    </div>
  );
};

export default ViewSkills;
