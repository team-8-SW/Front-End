import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import SkillsData from "./SkillsData";
import { FaArrowLeft } from "react-icons/fa";
import AddSkillModal from "./AddSkillModal";
import { Link } from "react-router-dom";  

const DetailedSkillsCard = ({ loggedUser }) => {
  const [skills, setSkills] = useState(loggedUser?.skills || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("skills",skills);  

  const handleSkillAdded = (newSkill) => {
    setSkills([...skills, newSkill]); // Update UI
  };

  useEffect(() => {
    setSkills(loggedUser?.skills || []);
  }, [loggedUser]);

  const handleSkillDelete = (deletedSkill) => {
    setSkills(skills.filter((skill) => skill !== deletedSkill));
  };

  if (!loggedUser) return <p>Loading user data...</p>;

  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Link to="/profile"> 
                <button className="text-gray-600 hover:text-gray-800">
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                </Link>
                <Typography variant="h3" className="font-medium text-gray-800">
                  Skills
                </Typography>
              </div>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => setIsModalOpen(true)}>
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Display Skills */}
            <div>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <SkillsData key={index} skill={skill} userId={loggedUser.id} onDelete={handleSkillDelete} />
                ))
                
              ) : (
                <Typography color="gray">No Skills Added</Typography>
              )}
            </div>
          </div>
        </Card>
      </div>
      <AddSkillModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={loggedUser.id}
        onSkillAdded={handleSkillAdded}
      />
    </div>
  );
};

export default DetailedSkillsCard;
