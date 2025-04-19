import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import { fetchPosts } from "../../../services/api";
import { fetchMyPosts } from "../../../services/api"; // Adjust the import path as necessary

const Posts = ({ loggedUser }) => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = await fetchPosts(token);
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  const handleRemovePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <PostDetails
            post={post}
            loggedUser={loggedUser}
            onRemovePost={handleRemovePost} // Pass the remove function
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
