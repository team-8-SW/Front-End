import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useName } from "../../../services/api";
import axios from "axios";

const PostModal = ({ isOpen, toggleModal,loggedUser }) => {
   const [postContent, setPostContent] = useState("");
  const [error, setError] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const name = useName(loggedUser.id);
  const token = localStorage.getItem("token");
  
  if (!isOpen) return null;
 

  const handlePost = async () => {
    if (postContent.trim() === "") {
      setError("Post content cannot be empty.");
      return;
    }
    setError("");

    

    try {
      await axios.post("http://localhost:5000/api/posts/me/newpost", {
        content: postContent,
        visibility: "public"
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post successful");
      toggleModal();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleOverlayClick = () => {
    toggleModal();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      data-testid="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end mt-4">
          <Button onClick={toggleModal} className="mr-2">
            Cancel
          </Button>
          <Button color="blue" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
