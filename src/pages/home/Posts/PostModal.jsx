import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/24/outline";

const PostModal = ({ isOpen, toggleModal, loggedUser }) => {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public"); // Default visibility
  const [media, setMedia] = useState(null); // State for media file
  const [mediaType, setMediaType] = useState(""); // State for media type
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  if (!isOpen) return null;

  const handlePost = async () => {
    if (postContent.trim() === "" && !media) {
      setError("Post content or media is required.");
      return;
    }
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/posts/me/newpost",
        {
          content: postContent,
          visibility: visibility,
          media_url: media, // Base64-encoded media
          media_type: mediaType, // Media type (e.g., image/jpeg)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post successful");
      toggleModal();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result); // Base64 string
        setMediaType(file.type); // Media type
      };
      reader.readAsDataURL(file); // Convert file to Base64
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

        {/* Media Upload */}
        <div className="mt-4 flex items-center">
          <label
            htmlFor="media-upload"
            className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700"
          >
            <PaperClipIcon className="h-5 w-5 mr-2" />
            Attach Media
          </label>
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaChange}
          />
          {media && <p className="ml-2 text-sm text-gray-600">Media attached</p>}
        </div>

        {/* Visibility Dropdown */}
        <div className="mt-4">
          <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
            Visibility
          </label>
          <select
            id="visibility"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="connections">Connections</option>
            <option value="private">Private</option>
          </select>
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
