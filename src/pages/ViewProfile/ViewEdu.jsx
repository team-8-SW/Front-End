import React,{useState} from "react";
import {
  Card,
  Typography,
  Button,
  
} from "@material-tailwind/react";
import {Link} from 'react-router-dom'
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import EduData3 from "./EduData3"; 
import { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import EducationFormModal from "../DetailedEducation/EducationFormModal"; 



const ViewEdu = ({loggedUser}) => {
    
    const [educations, seteducations] = useState(loggedUser?.education || []);
    console.log(educations);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleAddEducation = (newSkill) => {
        seteducations([...educations, newSkill]); // Update UI
      };

     
      
      
    
      useEffect(() => {
        seteducations(loggedUser?.education || []);
      }, [loggedUser]);
      

  return (
    <div>
   
        <div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              Education
            </Typography>
            <div className="flex items-center space-x-3">
              
            
            </div>
          </div>
  
          {/* Experience Entry */}
          <div>
              
              {educations.length > 0 ? (
                                educations.map((edu, index) => (
                  <EduData3  key={index} edu={edu} />
                ))
                
                
                
              ) : (
                <Typography color="gray">No Skills Added</Typography>
              )}
            </div>
        </Card>
      </div>
      {isModalOpen && <EducationFormModal userId={loggedUser?.id} onClose={() => setIsModalOpen(false)} onSave={handleAddEducation} />}
      
     
    </div>
  );
};

export default ViewEdu;