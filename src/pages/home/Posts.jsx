import React from "react";
import PostDetails from "./PostDetails";

const Posts = () => {
  const userId = 2;
  return (
    <div>
      <div>
        <PostDetails postId={userId} />
      </div>
    </div>
  );
};
export default Posts;
