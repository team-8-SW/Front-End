import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { tagUser } from "../../../utils/tagUserUtils";
import { addMedia, searchUsers } from "../../../services/api";

const PostModal = ({ isOpen, toggleModal, loggedUser }) => {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [taggedUserId, setTaggedUserId] = useState(null);
  const [file,setFile]=useState(null);
  const token = localStorage.getItem("token");
  if (!isOpen) return null;

  const handlePost = async () => {
    if (postContent.trim() === "" && !media) {
      setError("Post content or media is required.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
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

      console.log("Post successful", response);

      // Get the post ID from the response
      const post_id = response.data.id;
      console.log("Post ID:", post_id);
      
      if (taggedUserId) {
        await tagUser(token, taggedUserId, post_id);
      }
      if(file){
        const res=await addMedia(file,token,post_id);
        console.log("Media added:", res);
      }
      
      
      toggleModal();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

const handleMediaChange = (event) => {
  const selectedFile=event.target.files[0]
  setFile(selectedFile);
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMedia(reader.result);
      setMediaType(file.type);
      console.log("Media set:", reader.result);
      console.log("Media type set:", file.type);
    };
    reader.readAsDataURL(file);
  }
};

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setPostContent(value);

    // Detect `@` and fetch suggestions
    const lastWord = value.split(" ").pop();
    if (lastWord.startsWith("@")) {
      setShowSuggestions(true);
      const query = lastWord.slice(1);
      try {
        const users = await searchUsers(token, query);
        console.log("Fetched Users:", users); // Debugging
        setSuggestions(users);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectUser = (user) => {
    const words = postContent.split(" ");
    words[words.length - 1] = `@${user.userName} `;
    setPostContent(words.join(" "));
    setShowSuggestions(false);
    setTaggedUserId(user.userId);
    console.log("Tagged User ID:", taggedUserId);
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

        {/* Input Field */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto w-full z-10">
            {suggestions.map((user) => (
              <li
                key={user.userId}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex items-center">
                  <img
                    src={
user.profilePictureUrl ||
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s"
}
                    alt={user.userName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.userName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

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
          <label
            htmlFor="visibility"
            className="block text-sm font-medium text-gray-700"
          >
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
