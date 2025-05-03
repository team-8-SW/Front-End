import React, { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { addMedia, searchUsers, tagUser } from "../../../services/api";
import { api } from "../../../services/profile";
const PostModal = ({ isOpen, toggleModal, loggedUser }) => {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [taggedUserIds, setTaggedUserIds] = useState([]);
  const [file, setFile] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);
  const token = localStorage.getItem("token");
  if (!isOpen) return null;

  const handlePost = async () => {
    if (postContent.trim() === "" && !media) {
      setError("Post content or media is required.");
      return;
    }
    setError("");

    try {
      const response = await api.post(
        `/api/posts/me/newpost`,
        {
          content: postContent,
          visibility: visibility,
          //media_url: media, // Base64-encoded media
          //media_type: mediaType, // Media type (e.g., image/jpeg)
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

      // Tag all selected users
      if (taggedUserIds.length > 0) {
        for (const userId of taggedUserIds) {
          await tagUser(token, userId, post_id);
        }
      }
      if (file || media) {
        const res = await addMedia(file || media, token, post_id);
        console.log("Media added:", res);
      }

      setPostContent("");
      setMedia(null);
      setFile(null);
      setTaggedUserIds([]);

      toggleModal();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleCancel = () => {
    setPostContent("");
    setMedia(null);
    setFile(null);
    setTaggedUserIds([]);
    toggleModal();
  };
  const handleMediaChange = (event) => {
    const selectedFile = event.target.files[0];
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
      const query = lastWord.slice(1).trim(); // Remove '@' and trim whitespace
      if (query !== "") {
        setShowSuggestions(true);

        // Calculate the position of the dropdown
        const textarea = textareaRef.current;
        const { selectionStart } = e.target;
        const { top, left } = calculateCursorPosition(textarea, selectionStart);
        console.log("Dropdown Position:", { top, left }); // Debugging
        setDropdownPosition({ top, left });

        try {
          const users = await searchUsers(token, { q: query });
          setSuggestions(users.users);
          console.log("Fetched Users:", users.users); // Debugging
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const calculateCursorPosition = (textarea, selectionStart) => {
    const div = document.createElement("div");
    const style = window.getComputedStyle(textarea);

    // Copy textarea styles to the div
    for (const prop of style) {
      div.style[prop] = style[prop];
    }

    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.textContent = textarea.value.substring(0, selectionStart);

    const span = document.createElement("span");
    span.textContent = "\u200b"; // Zero-width space
    div.appendChild(span);

    document.body.appendChild(div);
    const { offsetTop, offsetLeft } = span;
    document.body.removeChild(div);

    const rect = textarea.getBoundingClientRect();
    return {
      top: rect.top + offsetTop - textarea.scrollTop,
      left: rect.left + offsetLeft - textarea.scrollLeft,
    };
  };

  const handleSelectUser = (user) => {
    const words = postContent.split(" ");
    words[words.length - 1] = `@${user.userName} `;
    setPostContent(words.join(" "));
    setShowSuggestions(false);

    // Add the selected user's ID to the taggedUserIds array
    setTaggedUserIds((prev) => [...prev, user.userId]);
    console.log("Tagged User IDs:", [...taggedUserIds, user.userId]);
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
          ref={textareaRef}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-10"
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
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
        </div>

        {/* Media Preview */}
        {media && (
          <div className="mt-4 p-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-gray-700 text-sm mr-2">{file?.name || "Selected Media"}</p>
              <p className="text-gray-500 text-xs">({mediaType})</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={() => {
                setMedia(null);
                setFile(null);
                setMediaType("");
              }}
            >
              X
            </button>
          </div>
        )}

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
          <Button onClick={handleCancel} className="mr-2">
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
