import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.author}</h2>
      <p>{post.content}</p>
      {/* Add more post details as needed */}
    </div>
  );
};

export default PostDetails;
