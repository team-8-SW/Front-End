import { Typography } from "@material-tailwind/react";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { handleDeleteSkill } from "../../services/profile";

const SkillsData = ({ skill, userId, onDelete }) => {
  const handleDelete = () => {
    handleDeleteSkill(skill.skillId, userId, onDelete);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-between mt-3">
        <Typography variant="h6" className="font-medium text-gray-800">
          {skill.skillName}
        </Typography>
        <div className="flex gap-2">
          <button className="text-gray-600 hover:text-gray-800">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-2" />
    </div>
  );
};

export default SkillsData;
