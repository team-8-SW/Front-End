import React, { useState, useEffect } from "react";
import {
  useProfilePicture,
  useName,
  handlerepostPost,
  handleLikePost,
  deletePost,
  getPostEngagement,
  getComments,
  useUserName,
  useUserData,
} from "../../../services/api";
import { Button } from "@material-tailwind/react";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon as OutlinerepostIcon,
  PaperAirplaneIcon as ShareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as SolidThumbUpIcon,
  ArrowPathRoundedSquareIcon as SolidrepostIcon,
} from "@heroicons/react/24/solid";
import CommentsSection from "./CommentsSection";

const PostDetails = ({ post, loggedUser, onRemovePost }) => {
  if (!post) return null;
  const token = localStorage.getItem("token");
  // const allComments= getComments(post.id,token);
  const allComments=[];
  const posterProfilePicture = useProfilePicture(post.user_id,token);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const commenterName = useName(null, token);
  const commenterProfilePicture = useProfilePicture(null, token);
  const [comments, setComments] = useState(allComments || []);
  const [showComments, setShowComments] = useState(false);
  const [repostsCount, setRepostsCount] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  useEffect(() => {
    if (post.liked) {
      setLiked(true);
    }
  }, [post.liked]);
  useEffect(() => {
    if (!post?.id) return;

    const fetchEngagement = async () => {
      try {
        const data = await getPostEngagement(post.id,token);
        setLikesCount(data.like_count || 0);
        setCommentsCount(data.comment_count || 0);
        setRepostsCount(data.repost_count || 0);
      } catch (error) {
        console.error("Error loading engagement data:", error);
      }
    };
  
    fetchEngagement();
  }, [post.id, token]);
  
  console.log(post.user_id, "post.user_id");
  const [posterData, setPosterData] = useState(null);

  useEffect(() => {
    const fetchPosterData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles/me/${post.user_id}`);
        console.log(response, "posterData");
        setPosterData(response?.data?.profile || null);
      } catch (error) {
        console.error("Error fetching poster data:", error);
      }
    };

    if (post?.user_id) {
      fetchPosterData();
    }
  }, [post?.user_id]);

  console.log(posterData, "posterData");
  const posterName = posterData?.profile?.userName;
  const handleDeletePost = async () => {
    try {
      await deletePost(post.id, token);
      console.log("Post deleted successfully");
      onRemovePost(post.id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  
  console.log(posterName);
  console.log(loggedUser?.profile?.userName);
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 relative">
      {/* Edit and Delete Buttons (only visible to the author) */}
      { loggedUser?.profile?.userName === posterName && ( 
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => console.log("Edit post clicked")}
            data-testid="edit-post-btn"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-red-700"
            onClick={() => setShowDeleteConfirmation(true)}
            data-testid="delete-post-btn"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  handleDeletePost();
                  setShowDeleteConfirmation(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={posterProfilePicture}
            alt={`${commenterName}'s profile`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{commenterName}</h2>
          <p className="text-sm text-gray-500">{post.created_at || "Just now"}</p>
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
            handleLikePost(post.id,token, liked, setLiked, setLikesCount)
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
          Comment {commentsCount}
        </Button>

        {/* Repost Button */}
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() =>
            handlerepostPost(post.id, token , setRepostsCount)
          }
          data-testid="repost-icon"
        >
          <SolidrepostIcon className="h-5 w-5" />
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
          token={token}
          commenterName={commenterName}
          commenterProfilePicture={commenterProfilePicture}
          comments={comments}
        />
      )}
    </div>
  );
};

export default PostDetails;
