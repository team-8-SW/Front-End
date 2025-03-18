import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Typography, Card } from "@material-tailwind/react";
import ExpData from "./ExpData";
import { FaArrowLeft } from "react-icons/fa";
import AddExpModal from "./AddExpModal";
import axios from "axios";
import { Link } from "react-router-dom";

const DetailedExpCard = ({ loggedUser }) => {
  const [experiences, setExperiences] = useState(loggedUser?.experience || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(experiences);

  useEffect(() => {
    setExperiences(loggedUser?.experience || []);
  }, [loggedUser]);

  const handleExpAdded = (newExp) => {
    setExperiences([...experiences, newExp]); // Update UI
  };

  const handleExpDelete = (deletedExp) => {
    setExperiences(experiences.filter((exp) => exp.title !== deletedExp.title));
  };

  if (!loggedUser) return <p>Loading user data...</p>;

  return (
    <div>
      <div className="flex justify-center mt-6">
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Link to="/profile">
                <button className="text-gray-600 hover:text-gray-800">
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                </Link>
                <Typography variant="h3" className="font-medium text-gray-800">
                  Experience
                </Typography>
              </div>
              <button className="text-gray-600 hover:text-gray-800" onClick={() => setIsModalOpen(true)}>
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Display Experiences */}
            <div>
              {experiences.length > 0 ? (
                experiences.map((experiences, index) => (
                  <ExpData key={index} experiences={experiences} userId={loggedUser.id} onDelete={handleExpDelete} />
                ))
              ) : (
                <Typography color="gray">No Experience Added</Typography>
              )}
            </div>
          </div>
        </Card>
      </div>
      <AddExpModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={loggedUser.id}
        onExpAdded={handleExpAdded}
      />
    </div>
  );
};

export default DetailedExpCard;
