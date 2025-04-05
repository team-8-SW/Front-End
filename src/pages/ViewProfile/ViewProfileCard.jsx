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
 // Import ContactInfo Component

const ProfileCard = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false); // State for Contact Info modal
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, [loggedUser]);

  if (!userData) return <p>Loading...</p>;

  // Handle file upload and preview
 

  // Handle text input change
  

  

  // Remove cover photo
 

  // Handle form submission
  

  return (
    <Card className="relative w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden">
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
      <CardFooter className="flex justify-start gap-3 pb-6">
      <Button className="rounded-full" color="blue">+ follow</Button>
      <Button variant="outlined" className="rounded-full" color="blue">
        message
      </Button>
      <Button variant="outlined" className="rounded-full">
        connect
      </Button>

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
