import React, { useEffect, useState, useRef, useCallback } from "react";
import PostDetails from "./PostDetails";
import { fetchPosts } from "../../../services/api";

const Posts = ({loggedUser}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    const newPosts = await fetchPosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
  }, [page]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts = await fetchPosts(1);
      setPosts(initialPosts);
      setPage(2);
    };
    fetchInitialPosts();
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMorePosts]
  );

  return (
    <div>
      {posts.map((post, index) => (
        <div
         
          ref={index === posts.length - 1 ? lastPostElementRef : null}
        >
          <PostDetails post={post}  key={post.id} loggedUser={loggedUser}/>
        </div>
      ))}
    </div>
  );
};

export default Posts;
