import React from "react";
import { Button, Avatar } from "@material-tailwind/react";
import {
  CameraIcon,
  CalendarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const PostBar = ({ photo, toggleModal }) => {
  return (
    <div className="mt-8 mx-auto max-w-2xl p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Avatar
          src={
            photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s"
          }
          alt="profile-picture"
          className="w-12 h-12 rounded-full"
        />
        <Button
          onClick={toggleModal}
          color="white"
          className="flex-1 p-4 bg-gray-200 text-left text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="font-semibold text-gray-500">Start a post</span>
        </Button>
      </div>
      <div className="flex justify-around mt-4">
        <Button
          color="blue"
          buttonType="outline"
          size="sm"
          rounded={true}
          ripple="light"
          className="flex items-center space-x-2"
        >
          <CameraIcon className="h-5 w-5" />
          <span>Media</span>
        </Button>
        <Button
          color="blue"
          buttonType="outline"
          size="sm"
          rounded={true}
          ripple="light"
          className="flex items-center space-x-2"
        >
          <CalendarIcon className="h-5 w-5" />
          <span>Event</span>
        </Button>
        <Button
          color="blue"
          buttonType="outline"
          size="sm"
          rounded={true}
          ripple="light"
          className="flex items-center space-x-2"
        >
          <DocumentTextIcon className="h-5 w-5" />
          <span>Write article</span>
        </Button>
      </div>
    </div>
  );
};

export default PostBar;
