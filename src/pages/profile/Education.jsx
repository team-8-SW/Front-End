import React,{useState} from "react";
import {
  Card,
  Typography,
  Button,
  
} from "@material-tailwind/react";
import {Link} from 'react-router-dom'
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import EduData2 from "./EduData2"; 
import { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import EducationFormModal from "../DetailedEducation/EducationFormModal"; 



const Education = ({loggedUser}) => {
    
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
    { educations.length > 0 ?(
        <div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              Education
            </Typography>
            <div className="flex items-center space-x-3">
              
              <div className="flex items-center space-x-3">
                


              <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
                <PlusIcon className="w-5 h-5" />
                </button>
              <Link to="/education">
              <button className="text-gray-600 hover:text-gray-800">
                <PencilIcon className="w-5 h-5" />
              </button>
              </Link>
              </div>
            </div>
          </div>
  
          {/* Experience Entry */}
          <div>
              
              {educations.length > 0 ? (
                                educations.map((edu, index) => (
                  <EduData2  key={index} edu={edu} />
                ))
                
                
                
              ) : (
                <Typography color="gray">No Skills Added</Typography>
              )}
            </div>
        </Card>
      </div>) :(<div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              Education
            </Typography>
            
          </div>
  
          {/* Experience Entry */}
          <div className=" rounded-lg p-4 mt-4 flex items-center justify-start gap-3">
            <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
              <span className="text-black text-lg"><FaGraduationCap/></span> {/* Placeholder Icon */}
            </div>
            <div>
              <Typography variant="body1" className="font-medium text-gray-800">
               School
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Degree,Field of study
              </Typography>
              <Typography variant="small" className="text-gray-500">
                2019 - 2023   {/* Added date */}
              </Typography>
              
            </div>
          </div>
           <div className="mt-3">
           <Link to="/education">
           <Button variant="outlined" color="blue">add Education</Button>
                </Link>
                     
                  </div>
        </Card>
      </div>)}
      {isModalOpen && <EducationFormModal userId={loggedUser?.id} onClose={() => setIsModalOpen(false)} onSave={handleAddEducation} />}
      
     
    </div>
  );
};

export default Education;