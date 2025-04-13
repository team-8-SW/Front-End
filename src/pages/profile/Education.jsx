import { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import EduData2 from "./EduData2";
import EducationFormModal from "../DetailedEducation/EducationFormModal";

const Education = ({ loggedUser }) => {
  const [educations, setEducations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEducation = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/profiles/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducations(res.data.education || []);
    } catch (err) {
      console.error("Failed to fetch education", err);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleAddEducation = (newEdu) => {
    setEducations([...educations, newEdu]);
  };

  return (
    <div>
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        <div className="flex items-center justify-between">
          <Typography variant="h6">Education</Typography>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
              <PlusIcon className="w-5 h-5" />
            </button>
            <Link to="/education">
              <PencilIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </Link>
          </div>
        </div>
        <div>
          {educations.length > 0 ? (
            educations.map((edu, index) => <EduData2 key={index} edu={edu} />)
          ) : (
            <div className="flex items-center space-x-3 mt-3">
              <FaGraduationCap className="text-xl" />
              <Typography>No education added</Typography>
            </div>
          )}
        </div>
      </Card>

      {isModalOpen && (
        <EducationFormModal onClose={() => setIsModalOpen(false)} onSave={handleAddEducation} />
      )}
    </div>
  );
};

export default Education;
