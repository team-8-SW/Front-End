import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useUserId, useName } from "../../services/api";

const PostModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState("");
  const userId = useUserId();
  const name = useName(userId);
  const handlePost = async () => {
    if (postContent.trim() === "") {
      setError("Post content cannot be empty.");
      return;
    }
    setError(""); // Clear any previous error
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postContent,
          id: userId,
          author: name,
          likes: 0,
          comments: [],
          shares: 0,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else console.log("Post successful");
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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <div>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="What's on your mind?"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
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
