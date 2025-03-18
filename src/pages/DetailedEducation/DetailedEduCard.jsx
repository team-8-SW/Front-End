import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import EduData from "./EduData";
import EducationFormModal from "./EducationFormModal";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const DetailedEduCard = ({ loggedUser }) => {
  const [education, setEducation] = useState(loggedUser?.education || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(education);

  useEffect(() => {
    setEducation(loggedUser?.education || []);
  }, [loggedUser]);

  // Add new education entry
  const handleAddEducation = (newEdu) => {
    setEducation([...education, newEdu]);
  };

  // Delete education entry
  const handleDeleteEducation = (deletedEdu) => {
    setEducation(education.filter((edu) => 
      !(edu.school === deletedEdu.school && edu.degree === deletedEdu.degree)
    ));
  };

  return (
    <div>
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        <div className="flex justify-between">
          
          <div className="flex gap-2 items-center">
{/* add here button */}
<Link to="/profile">
<button className="text-gray-600 hover:text-gray-800">
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                </Link>
          <Typography variant="h3">Education</Typography>

          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {education.length > 0 ? education.map((edu, index) => (
          <EduData key={index} edu={edu} userId={loggedUser.id} onDelete={handleDeleteEducation} />
        )) : <Typography>No Education Added</Typography>}
      </Card>

      {isModalOpen && <EducationFormModal userId={loggedUser?.id} onClose={() => setIsModalOpen(false)} onSave={handleAddEducation} />}
    </div>
  );
};

export default DetailedEduCard;
