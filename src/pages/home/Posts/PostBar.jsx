import React from "react";
import { Button } from "@material-tailwind/react";
import { CameraIcon, CalendarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import ProfilePicture from "../ProfilePicture";

const PostBar = ({ photo, togglePostModal, }) => {
  return (
    <div className="mt-8 mx-auto max-w-2xl p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <ProfilePicture photo={photo} />
        <Button
          onClick={togglePostModal}
          data-testid="start-post-btn"
          color="white"
          className="flex-1 p-4 bg-gray-200 text-left text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="font-semibold text-gray-500">Start a post</span>
        </Button>
      </div>
      
    </div>
  );
};

export default PostBar;