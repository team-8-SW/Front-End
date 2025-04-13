import React, { useState, useEffect } from "react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Typography, Card, Button } from "@material-tailwind/react";
import SkillsData2 from "./SkillsData2";
import AddSkillModal from "../DetailedSkills/AddSkillModal";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const SkillsCard = ({ loggedUser }) => {
  const [skills, setSkills] = useState(loggedUser?.skills || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setSkills(loggedUser?.skills || []);
  }, [loggedUser]);

  const displayedSkills = showAll ? skills : skills.slice(0, 2);

  const handleSkillAdded = (newSkill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

  if (!loggedUser) return <p>Loading user data...</p>;

  return (
    <div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Typography variant="h3" className="font-medium text-gray-800">Skills</Typography>
            <div className="flex gap-2">
              <Link>
              <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
                <PlusIcon className="w-5 h-5" />
              </button>
              </Link>
              
              <Link to="/skills">
                <button className="text-gray-600 hover:text-gray-800">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Displayed Skills */}
          <div>
            {skills.length > 0 ? (
              displayedSkills.map((skill, index) => (
                <SkillsData2 key={index} skill={skill} />
              ))
            ) : (
              <div className="flex flex-col">
                <Typography className="text-[#0000004D]">technical skills</Typography>
                <hr className="border-t border-gray-300 my-2" />
                <Typography className="text-[#0000004D]">soft skills</Typography>
                <hr className="border-t border-gray-300 my-2" />
                <div className="mt-2">
                  <Link to="/skills">
                    <Button variant="outlined" color="blue">add skills</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {skills.length > 2 && (
            <Link to="/skills" className="text-center">
              <button className="text-gray-700 font-medium text-sm mt-2 hover:underline flex items-center justify-center text-center">
                {showAll ? "Show less" : `Show all ${skills.length} skills →`}
              </button>
            </Link>
          )}
        </div>
      </Card>

      {/* Modal */}
      <AddSkillModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={loggedUser.id}
        onSkillAdded={handleSkillAdded}
      />
    </div>
  );
};

export default SkillsCard;
