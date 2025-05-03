
import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import { fetchPosts } from "../../../services/api";
import { fetchMyPosts } from "../../../services/api"; // Adjust the import path as necessary
import { usePosts } from "./PostsContext";

const Posts = ({ loggedUser, searching }) => {
  const {posts, setPosts} = usePosts();
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

    if (!searching) {
      fetchAllPosts();
    }
  }, [token, searching,setPosts]);

  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div>
      {console.log("Posts:", posts)}
      {posts.length === 0 && <p>No posts available</p>}
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id}>
            <PostDetails post={post} loggedUser={loggedUser} onRemovePost={handleRemovePost} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
