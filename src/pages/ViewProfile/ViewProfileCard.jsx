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
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import ViewContactInfo from "./ViewContactInfo";
import ConnectButton from "../network/ConnectButton";
import { removeConnection } from "../../services/api";

const ViewProfileCard = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveConnection = async () => {
    try {
      const data = await removeConnection(profile.user_id);
      console.log("Connection removed:", data);
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  return (
    <Card className="relative w-full mx-auto shadow-lg rounded-lg">
      {/* Cover Image */}
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src={profile.coverPhotoUrl || "/default-cover.jpg"}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </CardHeader>

      {/* Profile Image */}
      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src={profile.profilePictureUrl || "/default-avatar.png"}
          size="xxl"
          className="border-4 border-white shadow-lg"
        />
      </div>

      {/* Info */}
      <CardBody className="pt-16">
        <div className="flex flex-col gap-2">
          <Typography variant="h3" color="blue-gray" className="font-semibold">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="small" className="text-gray-500">
            {profile.bio}
          </Typography>
          <div className="flex gap-2">
            <Typography variant="small" className="text-gray-500">
              {profile.location}
            </Typography>
            <button
              onClick={() => setOpenContact(true)}
              className="text-blue-500 cursor-pointer flex items-center gap-1"
            >
              Contact Info <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap pb-6 mt-6 relative">
        <div className="min-w-[110px]">
          <ConnectButton />
        </div>

        <Button variant="outlined" className="rounded-full w-[120px]" color="blue">
          Message
        </Button>

        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center min-w-[120px] rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          More
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
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
            <div className="py-1">
              <button
                onClick={handleRemoveConnection}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Remove Connection
              </button>
            </div>
          </div>
        )}
      </div>
      </CardBody>

      {/* Buttons */}
      

      {/* Contact Info Dialog */}
      <Dialog open={openContact} handler={() => setOpenContact(false)}>
        <ViewContactInfo userData={profile} setOpenContact={setOpenContact} />
      </Dialog>
    </Card>
  );
};

export default ViewProfileCard;
