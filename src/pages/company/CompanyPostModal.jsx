import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";

const CompanyPostModal = ({
  isOpen,
  toggleModal,
  companyid,
  companyName,
  setPosts,
}) => {
  if (!isOpen) return null;

  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState(""); // <- Now using URL instead of File
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (postTitle.trim() === "" || postContent.trim() === "") {
      setError("Post title and content cannot be empty.");
      return;
    }

    try {
      setError("");
      const token = localStorage.getItem("token");
       const companyId="20f970d2-7933-41db-af9e-9fb987a11a1e"


      const payload = {
        title: postTitle,
        content: postContent,
        media_url: mediaUrl || "", // leave empty string if none provided
      };

      const response = await axios.post(
        `http://localhost:5000/api/company/${companyid}/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (setPosts) {
        setPosts((prev) => [response.data, ...prev]);
      }

      // Reset & close
      setPostContent("");
      setPostTitle("");
      setMediaUrl("");
      toggleModal();
    } catch (error) {
      console.error("Error posting:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  const handleOverlayClick = () => toggleModal();
  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div
      data-testid="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4">Post as {companyName}</h2>

        <Input
          label="Post Title"
          className="mb-3"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          rows="4"
          placeholder="What's on your company's mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        <Input
          label="Media URL (optional)"
          className="mb-3"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
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

export default CompanyPostModal;
