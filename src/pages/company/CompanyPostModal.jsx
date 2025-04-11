import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useUserId, useName } from "../../services/api";
import axios from "axios";

const CompanyPostModal = ({
  isOpen,
  toggleModal,
  companyId,
  companyName,
  setPosts, // ✅ new prop to update posts list
}) => {
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
          (max, post) => (parseInt(post.id) > max ? parseInt(post.id) : max),
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

    setError("");
    const newPostId = (parseInt(lastPostId, 10) + 1).toString();

    const newPost = {
      id: newPostId,
      content: postContent,
      authorId: companyId,
      authorName: companyName,
      companyId: companyId,
      likes: [],
      comments: [],
      reposts: [],
      timestamp: new Date().toISOString(),
    };
    

    try {
      await axios.post("http://localhost:3000/posts", newPost);

      // ✅ Update post list immediately
      if (setPosts) {
        setPosts(prev => [newPost, ...prev]);
      }

      toggleModal();
      setPostContent("");
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
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's on your company's mind?"
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

export default CompanyPostModal;