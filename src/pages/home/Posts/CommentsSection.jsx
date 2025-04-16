import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { handleAddNewComment,getPostEngagement } from "../../../services/api";
const CommentsSection = ({
  postId,
  token,
  commenterName,
  commenterProfilePicture,
  comments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);
  
  const comments_count= getPostEngagement(postId).comment_count;

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
          onClick={() =>
                          handleAddNewComment(
                            postId,
                            newComment,
                            token
                          )}
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
            <p className="text-gray-800 font-semibold">{comment.authorName}</p>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}

      {/* Load More Button */}
      {visibleComments < comments_count && (
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