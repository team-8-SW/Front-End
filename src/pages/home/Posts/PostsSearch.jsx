import React, { useState } from "react";
import { searchPosts } from "../../services/api";
import PostDetails from "./Posts/PostDetails";

const PostsSearch = ({ token }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await searchPosts(searchQuery, token); // Pass the query to the updated function
      setPosts(result);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 text-sm rounded w-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {posts.length > 0 ? (
        <div className="space-y-4">
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
      ) : (
        !loading && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg font-semibold">
              No posts found.
            </p>
            <p className="text-gray-400 text-sm">
              Try searching for something else.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PostsSearch;