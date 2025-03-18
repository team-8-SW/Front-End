import React from "react";
import { Button } from "@material-tailwind/react";

const PostModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's on your mind?"
        />
        <div className="flex justify-end mt-4">
          <Button onClick={toggleModal} className="mr-2">
            Cancel
          </Button>
          <Button color="blue">Post</Button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
