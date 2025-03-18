import { Typography } from "@material-tailwind/react";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const SkillsData = ({ skill, userId, onDelete }) => {
  const handleDelete = () => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        const updatedSkills = res.data.skills.filter((s) => s !== skill);
  
        return axios.patch(`http://localhost:3000/users/${userId}`, {
          skills: updatedSkills, // Update only the skills array
        });
      })
      .then(() => {
        onDelete(skill); // Update the UI in React
      })
      .catch((err) => console.error("Error deleting skill:", err));
  };

  return (
    <div>
      <div className="flex justify-between mt-3">
        <Typography variant="h6" className="font-medium text-gray-800">
          {skill}
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
