
import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import { fetchPosts } from "../../../services/api";
import { fetchMyPosts } from "../../../services/api"; // Adjust the import path as necessary

const Posts = ({ loggedUser, searching, setSearching, globalPosts, setGlobalPosts }) => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = await fetchPosts(token);
        setPosts(allPosts);
        setGlobalPosts(allPosts); // Sync global posts for search fallback
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (!searching) {
      fetchAllPosts();
    }
  }, [token, searching]);

  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setGlobalPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div>
      {!searching &&
        posts.map((post) => (
          <div key={post.id}>
            <PostDetails post={post} loggedUser={loggedUser} onRemovePost={handleRemovePost} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
