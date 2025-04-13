import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ExpData2 from "./ExpData2";
import AddExpModal from "../Detailedexperience/AddExpModal";

const Exp = ({ loggedUser }) => {
  const [experiences, setExperiences] = useState(loggedUser?.experiences || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setExperiences(loggedUser?.experiences || []);
  }, [loggedUser]);

  const handleExpAdded = (newExp) => setExperiences([...experiences, newExp]);

  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
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
          <div>
            {experiences.length > 0 ? (
              experiences.map((exp, idx) => <ExpData2 key={idx} experiences={exp} />)
            ) : (
              <Typography>No Experience Added</Typography>
            )}
          </div>
        </Card>
      </div>
      {isModalOpen && <AddExpModal onClose={() => setIsModalOpen(false)} onExpAdded={handleExpAdded} />}
    </div>
  );
};

export default Exp;
