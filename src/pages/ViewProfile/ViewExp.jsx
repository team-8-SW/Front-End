import React,{useState} from "react";
import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ExpData3 from "./ExpData3";





const ViewExp = ({loggedUser}) => {
    
    const [experiences, setExperiences] = useState(loggedUser?.experience || []);
    console.log(experiences);
    console.log(loggedUser);
        const [isModalOpen, setIsModalOpen] = useState(false);
        console.log("isModalOpen:", isModalOpen);
         
        
        
          useEffect(() => {
            setExperiences(loggedUser?.experience || []);
          }, [loggedUser]);
          
  return (
    <div>
   
        <div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              Experience
            </Typography>
           
          </div>
  
          {/* Experience Entry */}
          <div>
              
              {experiences.length > 0 ? (
                                experiences.map((experiences, index) => (
                  <ExpData3  key={index} experiences={experiences} />
                ))
                
                
                
              ) : (
                <Typography color="gray">No Skills Added</Typography>
              )}
            </div>
        </Card>
      </div>
      


    </div>
  );
};

export default ViewExp;