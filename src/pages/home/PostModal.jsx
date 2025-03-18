<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React from "react";
import { Button } from "@material-tailwind/react";

const PostModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useUserId, useName } from "../../services/api";
import axios from "axios";

const PostModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const userId = useUserId();
  const name = useName(userId);

  useEffect(() => {
    const fetchLastPostId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        const posts = response.data;
        const maxId = posts.reduce(
          (max, post) => (post.id > max ? post.id : max),
          0
        );
        setLastPostId(maxId);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchLastPostId();
  }, []);

  const handlePost = async () => {
    if (postContent.trim() === "") {
      setError("Post content cannot be empty.");
      return;
    }
    setError(""); // Clear any previous error

    const newPostId = (parseInt(lastPostId, 10) + 1).toString();

    try {
      await axios.post("http://localhost:3000/posts", {
        id: newPostId,
        content: postContent,
        authorId: userId,
        authorName: name,
        likes: [],
        comments: [],
        shares: 0,
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
>>>>>>> Stashed changes

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
