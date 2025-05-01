import React, { useState, useEffect } from "react";
import {
  useProfilePicture,
  useName,
  handlerepostPost,
  handleLikePost,
  deletePost,
  getPostEngagement,
  getComments,
  getSavedPosts,
} from "../../../services/api";
import { api } from "../../../services/profile"; // Import api from profile.js
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon as OutlinerepostIcon,
  PaperAirplaneIcon as ShareIcon,
  PencilIcon,
  TrashIcon,
  BookmarkIcon as OutlineBookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as SolidThumbUpIcon,
  ArrowPathRoundedSquareIcon as SolidrepostIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from "@heroicons/react/24/solid";
import CommentsSection from "./CommentsSection";
import EditPostModal from "./EditPostModal";

const PostDetails = ({ post, loggedUser, onRemovePost }) => {
  const token = localStorage.getItem("token");

  const posterProfilePicture = post.mypost
    ? useProfilePicture(null, token)
    : useProfilePicture(post.user_id, token);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [repostsCount, setRepostsCount] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const posterName = post.mypost
    ? useName(null, token)
    : useName(post.user_id, token);
  const [commentsCount, setCommentsCount] = useState( 0);
  const [saved, setSaved] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const commenterProfilePicture = useProfilePicture(null, token);

  useEffect(() => {
    if (post.liked) setLiked(true);
  }, [post.liked]);

  useEffect(() => {
    setLikesCount(post.like_count || 0);
    setRepostsCount(post.repost_count || 0);
    setCommentsCount(post.comment_count || 0);
  }, [post.like_count, post.repost_count, post.comment_count]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const savedposts = await getSavedPosts(token);
      if (savedposts && Array.isArray(savedposts)) {
        const isSaved = savedposts.some(
          (savedPost) => savedPost.post_id === post.id
        );
        setSaved(isSaved);
      }
    };

    fetchSavedPosts();
  }, [post.id, token]);

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id, token);
      console.log("Post deleted successfully");
      onRemovePost(post.id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleBookmarkPost = async () => {
    if (saved) {
      handleUnsavePost();
      return;
    } else {
      handleSavePost();
      return;
    }
  };

  const handleSavePost = async () => {
    try {
      await api.post(
        `/api/posts/me/save`,
        { post_id: post.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post saved");
      setSaved(true);
    } catch (error) {
      console.error("Failed to bookmark post:", error);
    }
  };

  const handleUnsavePost = async () => {
    try {
      await api.delete(`/api/posts/me/unsavepost`, {
        data: { post_id: post.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Post unsaved successfully");
      setSaved(false);
    } catch (error) {
      console.error("Failed to unsave post:", error);
    }
  };

  const handleReportPost = async () => {
    try {
      await api.post(
        `/api/posts/me/report`,
        {
          post_id: post.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Post reported successfully.");
      onRemovePost(post.id);
    } catch (error) {
      console.error("Failed to report post:", error);
      alert("Failed to report post. Try again.");
    }
  };

  const handleUpdatePost = (updatedPost) => {
    post.content = updatedPost.content;
    post.visibility = updatedPost.visibility;
    post.media_url = updatedPost.media_url;
    post.media_type = updatedPost.media_type;

    console.log("Post updated:", updatedPost);
  };

  const handleSharePost = () => {
    const shareUrl = post.link_url || window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post!",
          text: post.content,
          url: shareUrl,
        })
        .then(() => console.log("Post shared successfully"))
        .catch((error) => console.error("Error sharing post:", error));
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  useEffect(() => {
    console.log("Token in PostDetails:", token);
  }, [token]);

  if (!post) return null;
  if (!token) {
    console.error("Token is missing or invalid.");
    return null; // Prevent rendering if the token is invalid
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 relative">
      {/* Top right buttons */}
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        {/* Bookmark Button */}
        <button
          className="text-gray-500 hover:text-blue-600"
          onClick={handleBookmarkPost}
          data-testid="bookmark-icon"
        >
          {saved ? (
            <SolidBookmarkIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <OutlineBookmarkIcon className="h-5 w-5" />
          )}
        </button>

        {/* Dropdown Menu */}
        <Menu>
          <MenuHandler>
            <button className="text-gray-500 hover:text-gray-700">⋮</button>
          </MenuHandler>
          <MenuList>
            {/* Report Button inside dropdown */}
            <MenuItem onClick={handleReportPost} className="text-red-600">
              Report Post
            </MenuItem>
            {/* Edit and Delete if owner */}
            {post.mypost && (
              <>
                <MenuItem
                  onClick={() => setShowEditModal(true)}
                  className="text-red-600"
                >
                  Edit Post
                </MenuItem>
                <MenuItem
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="text-red-600"
                >
                  Delete Post
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </div>

      {/* Delete confirmation popup */}
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

      {/* Post Content */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={posterProfilePicture}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{posterName}</h2>
          <p className="text-sm text-gray-500">
            {post.created_at
              ? new Date(post.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              : "Just now"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Media Content */}
      {post.media_url && post.media_type && (
        <div className="mb-4">
          {post.media_type.startsWith("image/") ? (
            <img
              src={post.media_url}
              alt="Post Media"
              className="w-full h-auto rounded-lg object-cover"
            />
          ) : post.media_type.startsWith("video/") ? (
            <video controls className="w-full h-auto rounded-lg">
              <source src={post.media_url} type={post.media_type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}

      {/* Buttons Footer */}
      <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm">
        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() =>
            handleLikePost(
              post.id,
              token,
              liked,
              setLiked,
              setLikesCount,
              likesCount
            )
          }
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
          onClick={() => setShowComments((prev) => !prev)}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          Comment {commentsCount}
        </Button>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={() =>
            handlerepostPost(post.id, token, setRepostsCount, repostsCount)
          }
        >
          <SolidrepostIcon className="h-5 w-5" />
          Repost {repostsCount}
        </Button>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1 hover:text-blue-600"
          onClick={handleSharePost}
        >
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </div>
      {showComments && (
        <CommentsSection
          postId={post.id}
          token={token}
          commenterName={loggedUser.userName}
          commenterProfilePicture={commenterProfilePicture}
          setCommentsCount={setCommentsCount}
          commentsCount={commentsCount}
        />
      )}

      {showEditModal && (
        <EditPostModal
          isOpen={showEditModal}
          toggleModal={() => setShowEditModal(false)}
          post={post}
          token={token}
          onUpdatePost={handleUpdatePost} // Pass the callback
        />
      )}
    </div>
  );
};

export default PostDetails;
