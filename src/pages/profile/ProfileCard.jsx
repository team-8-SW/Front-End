import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const ProfileCard = ({loggedUser}) => {
  if (!loggedUser) {
    return <p>Loading...</p>; // Display a loading message while data is being fetched
  }
  return (
    <Card className="relative w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Cover Image */}
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="cover-image"
          className="w-full h-full object-cover p-0"
        />
      </CardHeader>

      {/* Profile Image */}
      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          size="xxl"
          className="border-4 border-white shadow-lg"
        />
      </div>

      {/* User Info */}
      <CardBody className="pt-16 ">
        <div className="flex flex-col  gap-2">
            <div className="flex justify-between">
            <Typography variant="h3" color="blue-gray" className="font-semibold">
            {loggedUser.fname} {loggedUser.lname}
        </Typography>
        <div className="flex flex-col gap-2">
        <Link to="/education" className="self-end" >
                  <button className="text-gray-600 hover:text-gray-800 ">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </Link>
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          cairo univerity
        </Typography>
        

        </div>
        
            </div>
            <Typography variant="small" className="text-gray-500">
         --
        </Typography>
            <div className="flex gap-2">
            <Typography variant="small" className="text-gray-500">
          Cairo, Cairo, Egypt
        </Typography>
        <Typography
          variant="small"
          className="text-blue-500 cursor-pointer "
        >
          Contact Info
        </Typography>
            </div>
            

        </div>
       
       
      </CardBody>

      {/* Buttons */}
      <CardFooter className="flex justify-start gap-3 pb-6">
        <Button color="blue">Open to</Button>
        <Button variant="outlined" color="blue">
          Add Profile Section
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
