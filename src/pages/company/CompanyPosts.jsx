import React, { useEffect, useState } from "react";
import CompanyCreatePost from "./CompanyCreatePost";
import CompanyPostsDetails from "./companypostsDetails";
import { fetchPosts, useUserId } from "../../services/api";

const CompanyPosts = ({ loggedUser }) => {
  const userId = useUserId();
  const [posts, setPosts] = useState([]);

  const companyName = loggedUser?.company?.name || "Your Company";

  useEffect(() => {
    const fetchCompanyPosts = async () => {
      const allPosts = await fetchPosts();
      const filtered = allPosts.filter(post => post.companyId === userId);
      setPosts(filtered.reverse()); // optional: newest posts first
    };

    if (userId) fetchCompanyPosts();
  }, [userId]);

  return (
    <div className="space-y-4">
      <CompanyCreatePost companyId={userId} companyName={companyName}    companyLogo={loggedUser?.company?.logo} setPosts={setPosts} />
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No posts yet.</p>
      ) : (
        posts.map(post => (
          <CompanyPostsDetails key={post.id} post={post} companyLogo={loggedUser?.company?.logo} />
        ))
      )}
    </div>
  );
};

export default CompanyPosts;