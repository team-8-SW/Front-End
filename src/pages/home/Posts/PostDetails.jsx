import React, { useState, useEffect } from "react";
import {
  useProfilePicture,
  useName,
  handlerepostPost,
  handleLikePost,
} from "../../../services/api";
import { Button } from "@material-tailwind/react";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon as OutlinerepostIcon,
  PaperAirplaneIcon as ShareIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as SolidThumbUpIcon,
  ArrowPathRoundedSquareIcon as SolidrepostIcon,
} from "@heroicons/react/24/solid";
import CommentsSection from "./CommentsSection"; // Import the new CommentsSection component

const PostDetails = ({ post, loggedUser }) => {
  const posterProfilePicture = useProfilePicture(post.authorId);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const commenterName = useName(loggedUser.id);
  const commenterProfilePicture = useProfilePicture(loggedUser.id);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [reposted, setreposted] = useState(false);
  const [repostsCount, setrepostsCount] = useState(post.reposts?.length || 0);

  useEffect(() => {
    if (Array.isArray(post.likes) && post.likes.includes(loggedUser.id)) {
      setLiked(true);
    }
  }, [post.likes, loggedUser.id]);

  useEffect(() => {
    if (Array.isArray(post.reposts) && post.reposts.includes(loggedUser.id)) {
      setreposted(true);
    }
  }, [post.reposts, loggedUser.id]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 relative">
      {/* Edit Button (only visible to the author) */}
      {loggedUser.id === post.authorId && (
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => console.log("Edit post clicked")}
          data-testid="edit-post-btn"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      )}

      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={posterProfilePicture}
            alt={`${post.authorName}'s profile`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{post.authorName}</h2>
          <p className="text-sm text-gray-500">{post.timestamp || "Just now"}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-4">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm">
        {/* Like Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() =>
            handleLikePost(post.id, loggedUser.id, liked, setLiked, setLikesCount)
          }
          data-testid="like-icon"
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
          onClick={() => setShowComments((prev) => !prev)}
          data-testid="comment-icon"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          Comment {comments.length}
        </Button>

        {/* Repost Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() =>
            handlerepostPost(post.id, loggedUser.id, reposted, setreposted, setrepostsCount)
          }
          data-testid="repost-icon"
        >
          {reposted ? (
            <SolidrepostIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlinerepostIcon className="h-5 w-5" />
          )}
          Repost {repostsCount}
        </Button>

        {/* Share Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          data-testid="share-icon"
        >
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentsSection
          postId={post.id}
          loggedUser={loggedUser}
          commenterName={commenterName}
          commenterProfilePicture={commenterProfilePicture}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
};

export default PostDetails;
