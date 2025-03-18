import React from "react";
import { useProfilePicture } from "../../services/api";
import { Button } from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const PostDetails = ({ post }) => {
  const posterProfilePicture = useProfilePicture(post.id);

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
        >
          <HandThumbUpIcon className="h-5 w-5" />
          Like {post.likes || 0}
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
