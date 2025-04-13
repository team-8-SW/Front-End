import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import EducationFormModal from "./EducationFormModal";
import EduData from "./EduData";
import axios from "axios";

const DetailedEduCard = ({ loggedUser }) => {
  const [education, setEducation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEducation = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/profiles/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEducation(res.data.education || []);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleAddEducation = (newEdu) => {
    setEducation([...education, newEdu]);
  };

  const handleDeleteEducation = (deletedEduId) => {
    setEducation(education.filter((edu) => edu.id !== deletedEduId));
  };

  return (
    <div>
      <Card className="border p-4 bg-white">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link to="/profile">
              <FaArrowLeft className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </Link>
            <Typography variant="h3">Education</Typography>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {education.length > 0 ? (
          education.map((edu) => (
            <EduData key={edu.id} edu={edu} onDelete={handleDeleteEducation} />
          ))
        ) : (
          <Typography>No Education Added</Typography>
        )}
      </Card>

      {isModalOpen && (
        <EducationFormModal onClose={() => setIsModalOpen(false)} onSave={handleAddEducation} />
      )}
    </div>
  );
};

export default DetailedEduCard;
