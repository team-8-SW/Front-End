import React,{useState} from "react";
import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ExpData2 from "./ExpData2";
import AddExpModal from "../Detailedexperience/AddExpModal"; // ✅ Ensure 'DetailedExperience' matches the actual folder name




const Exp = ({loggedUser}) => {
    
    const [experiences, setExperiences] = useState(loggedUser?.experience || []);
    console.log(experiences);
    console.log(loggedUser);
        const [isModalOpen, setIsModalOpen] = useState(false);
        console.log("isModalOpen:", isModalOpen);
         
        const handleExpAdded = (newExp) => {
          setExperiences([...experiences, newExp]); // Update UI
        };
        
          useEffect(() => {
            setExperiences(loggedUser?.experience || []);
          }, [loggedUser]);
          
  return (
    <div>
    { experiences.length > 0 ?(
        <div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              Experience
            </Typography>
            <div className="flex items-center space-x-3">
             <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
                             <PlusIcon className="w-5 h-5" />
                             </button>
              <Link to="/experience">
                  <button className="text-gray-600 hover:text-gray-800">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </Link>
            </div>
          </div>
  
          {/* Experience Entry */}
          <div>
              
              {experiences.length > 0 ? (
                                experiences.map((experiences, index) => (
                  <ExpData2  key={index} experiences={experiences} />
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
              Experience
            </Typography>
            <div className="flex items-center space-x-3">
            <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-800">
                             <PlusIcon className="w-5 h-5" />
                             </button>
              
              <Link to="/experience">
                  <button className="text-gray-600 hover:text-gray-800">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </Link>
            </div>
          </div>
  
          {/* Experience Entry */}
          <div className=" rounded-lg p-4 mt-4 flex items-center justify-start gap-3">
            <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded">
              <span className="text-gray-500 text-lg">📁</span> {/* Placeholder Icon */}
            </div>
            <div>
              <Typography variant="body1" className="font-medium text-gray-800">
               Job Title
              </Typography>
              <Typography variant="small" className="text-gray-500">
                organization
              </Typography>
              <Typography variant="small" className="text-gray-500">
                2023 - Present    {/* Added date */}
              </Typography>
              
            </div>
          </div>
           <div className="mt-3">
            <Link to="/experience">
                     <Button variant="outlined" color="blue">add Experience</Button>
            </Link>
                  </div>
        </Card>
      </div>)}
      {isModalOpen && <AddExpModal open={isModalOpen} userId={loggedUser?.id} onClose={() => setIsModalOpen(false)} onExpAdded={handleExpAdded} />}


    </div>
  );
};

export default Exp;