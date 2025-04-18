import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useUserId } from "../../services/api";
import axios from "axios";

const CompanyPostModal = ({
  isOpen,
  toggleModal,
  companyId,
  companyName,
  setPosts,
}) => {
  if (!isOpen) return null;

  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (postContent.trim() === "") {
      setError("Post content cannot be empty.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent);
    if (mediaFile) formData.append("media", mediaFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/company/${companyId}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (setPosts) {
        setPosts((prev) => [response.data, ...prev]);
      }

      toggleModal();
      setPostContent("");
      setPostTitle("");
      setMediaFile(null);
    } catch (error) {
      console.error("Error posting:", error);
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
        <h2 className="text-xl font-bold mb-4">Post as Company</h2>

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

        <input
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={(e) => setMediaFile(e.target.files[0])}
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
