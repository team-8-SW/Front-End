import React, { useEffect, useState } from "react";
import { fetchPost } from "../../services/api";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const fetchedPost = await fetchPost(postId);
      setPost(fetchedPost);
    };

    getPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  console.log(post.author);
  return (
    <div>
      <h1>{post.author}</h1>
      <p>{post.content}</p>
      <p>Likes: {post.likes}</p>
      <p>Comments: {post.comments.length}</p>
      <p>Shares: {post.shares}</p>
    </div>
  );
};

export default PostDetails;
