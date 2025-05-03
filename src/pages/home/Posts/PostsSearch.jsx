import React, { useState } from "react";
import { searchPosts } from "../../../services/api";
import PostDetails from "./PostDetails";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PostsSearch = ({ searching, setSearching, setGlobalPosts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    if (!searchQuery.trim()) {
      setSearching(false);
      setSearched(false);
      setPosts([]);
      setGlobalPosts([]); // Optionally reset global posts
      return;
    }
  
    setLoading(true);
    setSearching(true);
    setError("");
    setSearched(true);
    setGlobalPosts([]); // Clear global posts
  
    try {
      const params = { query: searchQuery.trim() };
      const response = await searchPosts(params);
      setPosts(response || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to load search results.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") {
              setSearching(false); // If search input is cleared, fetch all posts
              setSearched(false);
              setPosts([]);
            }
          }}
          className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>

      {loading && <p className="text-gray-500 mt-2">Loading...</p>}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {searched && posts.length === 0 && !loading && (
        <div className="text-center mt-4">
          <p className="text-gray-500 text-lg font-semibold">No posts found.</p>
          <p className="text-gray-400 text-sm">Try searching for something else.</p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <PostDetails
              key={post.id}
              post={post}
              loggedUser={token}
              onRemovePost={(id) =>
                setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsSearch;
