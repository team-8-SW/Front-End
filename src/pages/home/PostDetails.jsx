import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
import { useProfilePicture, useUserId } from "../../services/api";
import { Button } from "@material-tailwind/react";
import axios from "axios";
=======
import {
  useProfilePicture,
  useUserId,
  useName,
  handleSharePost,
  handleLikePost,
  handleAddNewComment,
  handleLoadMoreComments,
} from "../../services/api";
import { Button, Input } from "@material-tailwind/react";
>>>>>>> Stashed changes
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon as OutlineShareIcon,
} from "@heroicons/react/24/outline";
import { 
  HandThumbUpIcon as SolidThumbUpIcon,
  ShareIcon as SolidShareIcon
 } from "@heroicons/react/24/solid";

const PostDetails = ({ post }) => {
  const posterProfilePicture = useProfilePicture(post.authorId);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const userId = useUserId();
<<<<<<< Updated upstream
=======
  const commenterName = useName(userId);
  const [visibleComments, setVisibleComments] = useState(2);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const[shared, setShared] = useState(false);
>>>>>>> Stashed changes

  const[sharesCount, setSharesCount] = useState(post.shares?.length || 0);
  useEffect(() => {
    if (Array.isArray(post.likes) && post.likes.includes(userId)) {
      setLiked(true);
    }
  }, [post.likes, userId]);

<<<<<<< Updated upstream
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

=======
  useEffect(() => {
    if (Array.isArray(post.shares) && post.shares.includes(userId)) {
      setShared(true);
    }
  }, [post.shares, userId]);
>>>>>>> Stashed changes
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
          onClick={() =>
            handleSharePost(post.id, userId, shared, setShared, setSharesCount)
          }
        >
          {shared ? (
            <SolidShareIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlineShareIcon className="h-5 w-5" />
          )}
          Share {sharesCount}
        </Button>
      </div>
<<<<<<< Updated upstream
=======

      {/* Comments Section */}
{showComments && ( // Show comments only if showComments is true
  <div className="mt-4">
    {/* Input for New Comment */}
    <div className="flex items-center gap-2 mb-4">
      <Input
        type="text"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="flex-1"
      />
      <Button
        variant="filled"
        color="blue"
        onClick={() =>
          handleAddNewComment(
            post.id,
            newComment,
            userId,
            commenterName,
            comments,
            setComments,
            setNewComment
          )
        }
        className="flex-shrink-0"
      >
        Post
      </Button>
    </div>

    {/* Display Comments */}
    {comments.slice(0, visibleComments).map((comment) => (
      <div
        key={comment.id}
        className="border-t border-gray-200 pt-2 mt-2 text-sm"
      >
        <div className="flex items-center gap-2">
          <p className="text-gray-800 font-semibold">{comment.authorName}</p>
        </div>
        <p>{comment.content}</p>
      </div>
    ))}

    {/* Load More Button */}
    {visibleComments < comments.length && (
      <Button
        variant="text"
        color="blue"
        onClick={() => handleLoadMoreComments(setVisibleComments)}
        className="mt-2"
      >
        Load More Comments
      </Button>
    )}
  </div>
)}
>>>>>>> Stashed changes
    </div>
  );
};

export default PostDetails;
