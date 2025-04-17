import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Dialog,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ViewContactInfo from "./ViewContactInfo"; // Import ContactInfo Component
import ConnectButton from "../network/ConnectButton";
import { removeConnection } from "../../services/api";
 // Import ContactInfo Component

const ProfileCard = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false); // State for Contact Info modal
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, [loggedUser]);

  if (!userData) return <p>Loading...</p>;
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveConnection = async () => {
    try {
      const data = await removeConnection(connectionId);
      console.log('Connection removed:', data);
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  // Handle file upload and preview
 

  // Handle text input change
  

  

  // Remove cover photo
 

  // Handle form submission
  

  return (
    <Card className="relative w-[100%] mx-auto shadow-lg rounded-lg">
      {/* Cover Image */}
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src={userData.coverPhoto || ""}
          alt="cover-image"
          className="w-full h-full object-cover p-0"
        />
      </CardHeader>

      {/* Profile Image */}
      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src={userData.profilePicture || ""}
          size="xxl"
          className="border-4 border-white shadow-lg"
        />
      </div>

      {/* User Info */}
      <CardBody className="pt-16">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Typography variant="h3" color="blue-gray" className="font-semibold">
              {userData.fname} {userData.lname}
            </Typography>
            
          </div>
          <Typography variant="small" className="text-gray-500">
            {userData.bio}
          </Typography>
          <div className="flex gap-2">
            <Typography variant="small" className="text-gray-500">
              {userData.locationCity}, {userData.locationCountry}
            </Typography>
            {/* Contact Info Button */}
            <button
              onClick={() => setOpenContact(true)}
              className="text-blue-500 cursor-pointer flex items-center gap-1"
            >
              Contact Info <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardBody>

      {/* Buttons */}
      <CardFooter className="flex items-center gap-4 flex-wrap md:flex-nowrap pb-6 mt-6 relative">
      <div className="min-w-[110px]">
       <ConnectButton userId={user.userId} token={token} />
      </div>
      <Button variant="outlined" className="rounded-full w-[120px]" color="blue">
  Message
</Button>
  <button
  onClick={toggleDropdown}
  className="inline-flex justify-center items-center min-w-[120px] rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
      More
    <svg
    className="-mr-1 ml-2 h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
     </svg>
     </button>
        
     {isOpen && (
     <div className="absolute right-0 top-[calc(100%+0.5rem)] w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
     <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <button
        onClick={handleRemoveConnection}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Remove Connection
      </button>
      </div>
     </div>
     )}
    </CardFooter>

      {/* Edit Profile Modal */}
      
      {/* Contact Info Modal */}
      <Dialog open={openContact} handler={() => setOpenContact(false)}>
        <ViewContactInfo userData={userData} setOpenContact={setOpenContact} />
      </Dialog>
    </Card>
  );
};

export default ProfileCard;
