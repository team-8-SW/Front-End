import React, { useState, useEffect } from "react";
import {
  useProfilePicture,
  useUserId,
  useName,
  handlerepostPost,
  handleLikePost,
  handleAddNewComment,
  handleLoadMoreComments,
} from "../../services/api";
import { Button, Input } from "@material-tailwind/react";
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

const CompanyPostsDetails = ({ post,companyLogo }) => {
  //const posterProfilePicture = useProfilePicture(post.authorId);
  const userId = useUserId();
  const commenterName = useName(userId);
  const commenterProfilePicture = useProfilePicture(userId);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [visibleComments, setVisibleComments] = useState(2);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [reposted, setreposted] = useState(false);
  const [repostsCount, setrepostsCount] = useState(post.reposts?.length || 0);

  useEffect(() => {
    if (Array.isArray(post.likes) && post.likes.includes(userId)) {
      setLiked(true);
    }
  }, [post.likes, userId]);

  useEffect(() => {
    if (Array.isArray(post.reposts) && post.reposts.includes(userId)) {
      setreposted(true);
    }
  }, [post.reposts, userId]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 relative max-w-xl mx-auto">
      {/* Edit Button */}
      {userId === post.authorId && (
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => console.log("Edit post clicked")}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={companyLogo || "default-logo.png"}
            alt={`${post.authorName}'s profile`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{post.authorName}</h2>
          <p className="text-sm text-gray-500">{post.timestamp ? new Date(post.timestamp).toLocaleString() : "Just now"}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-3">{post.content}</p>

      {/* Action Buttons */}
      <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm font-semibold mb-4">
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() => handleLikePost(post.id, userId, liked, setLiked, setLikesCount)}
        >
          {liked ? (
            <SolidThumbUpIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlineThumbUpIcon className="h-5 w-5" />
          )}
          Like {likesCount}
        </Button>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() => setShowComments(prev => !prev)}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          Comment {comments.length}
        </Button>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() => handlerepostPost(post.id, userId, reposted, setreposted, setrepostsCount)}
        >
          {reposted ? (
            <SolidrepostIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlinerepostIcon className="h-5 w-5" />
          )}
          Repost {repostsCount}
        </Button>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
        >
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={commenterProfilePicture}
              alt={`${commenterName}'s profile`}
              className="w-8 h-8 rounded-full object-cover"
            />
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
              onClick={() => handleAddNewComment(post.id, newComment, userId, commenterName, comments, setComments, setNewComment)}
              className="flex-shrink-0"
            >
              Post
            </Button>
          </div>

          {comments.slice(0, visibleComments).map((comment) => (
            <div key={comment.id} className="border-t border-gray-200 pt-2 mt-2 text-sm">
              <div className="flex items-center gap-2">
                <p className="text-gray-800 font-semibold">{comment.authorName}</p>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}

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
    </div>
  );
};

export default CompanyPostsDetails;