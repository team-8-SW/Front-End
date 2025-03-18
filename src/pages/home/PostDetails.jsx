import React, { useState, useEffect } from "react";
import { useProfilePicture, useUserId } from "../../services/api";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as SolidThumbUpIcon } from "@heroicons/react/24/solid";

const PostDetails = ({ post }) => {
  const posterProfilePicture = useProfilePicture(post.authorId);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const userId = useUserId();

  useEffect(() => {
    if (Array.isArray(post.likes) && post.likes.includes(userId)) {
      setLiked(true);
    }
  }, [post.likes, userId]);

  const handleLike = async () => {
    if (liked) {
      await unlikePost(post.id, userId);
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      await likePost(post.id, userId);
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const likePost = async (postId, userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      const post = response.data;
      post.likes.push(userId);
      await axios.put(`http://localhost:3000/posts/${postId}`, post);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const unlikePost = async (postId, userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      const post = response.data;
      post.likes = post.likes.filter((id) => id !== userId);
      await axios.put(`http://localhost:3000/posts/${postId}`, post);
    } catch (error) {
      console.error("Error unliking the post:", error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={posterProfilePicture}
            alt={`${post.author}'s profile`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{post.author}</h2>
          <p className="text-sm text-gray-500">
            {post.timestamp || "Just now"}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-4">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between text-gray-600 text-sm">
        {/* Like Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={handleLike}
        >
          {liked ? (
            <SolidThumbUpIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlineThumbUpIcon className="h-5 w-5" />
          )}
          Like {likesCount}
        </Button>

        {/* Comment Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          Comment {post.comments?.length || 0}
        </Button>

        {/* Share Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
        >
          <ShareIcon className="h-5 w-5" />
          Share {post.shares || 0}
        </Button>
      </div>
    </div>
  );
};

export default PostDetails;
