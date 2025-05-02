import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  handleAddNewComment,
  getComments,
  getUserName,
  getProfilePicture,
} from "../../../services/api";

const CommentsSection = ({
  postId,
  token,
  commenterName,
  commenterProfilePicture,
  setCommentsCount,
  commentsCount,
  loggedUser,
}) => {
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);
  const [comments, setComments] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [profilePictures, setProfilePictures] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(postId, token);
        setComments(Array.isArray(data) ? data : []);

        const userIds = Array.from(
          new Set(data.map((comment) => comment.user_id))
        );

        const userNameMap = {};
        const profilePictureMap = {};

        await Promise.all(
          userIds.map(async (userId) => {
            try {
              const [userName, profilePicture] = await Promise.all([
                getUserName(userId, token),
                getProfilePicture(userId, token),
              ]);
              userNameMap[userId] = userName;
              profilePictureMap[userId] = profilePicture;
            } catch (err) {
              console.warn(`Failed to fetch info for userId ${userId}:`, err);
              userNameMap[userId] = "Unknown";
              profilePictureMap[userId] = "/default-profile.png";
            }
          })
        );

        setUserNames(userNameMap);
        setProfilePictures(profilePictureMap);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, token]);

  const handlePostComment = async () => {
    try {
      const response = await handleAddNewComment(
        postId,
        newComment,
        token,
        setCommentsCount,
        commentsCount
      );

      const newCommentObject = {
        post_id: response.post_id,
        user_id: response.user_id,
        id: response.id,
        content: response.content,
        created_at: response.created_at,
      };

      // ✅ Ensure current user data is stored for display
      setUserNames((prev) => ({
        ...prev,
        [response.user_id]: commenterName,
      }));

      setProfilePictures((prev) => ({
        ...prev,
        [response.user_id]: commenterProfilePicture,
      }));

      setComments((prevComments) => [newCommentObject, ...prevComments]);
      setVisibleComments((prevVisible) => prevVisible + 1);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="mt-4">
      {/* Input for New Comment */}
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
          onClick={handlePostComment}
          className="flex-shrink-0"
          data-testid="post-comment-btn"
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
            <img
              src={
                profilePictures[comment.user_id] || "/default-profile.png"
              }
              alt={`${userNames[comment.user_id] || "Unknown"}'s profile`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                {userNames[comment.user_id] || "you"}
                <span className="text-gray-500 text-xs">
                  {comment.created_at
                    ? new Date(comment.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : ""}
                </span>
              </p>
            </div>
          </div>
          <p className="ml-10 text-gray-700">{comment.content}</p>
        </div>
      ))}

      {/* Load More Button */}
      {visibleComments < comments.length && (
        <Button
          variant="text"
          color="blue"
          onClick={() => setVisibleComments((prev) => prev + 2)}
          className="mt-2"
          data-testid="load-more-comments-btn"
        >
          Load More Comments
        </Button>
      )}
    </div>
  );
};

export default CommentsSection;
