import React, { useEffect, useState } from "react";
import CompanyCreatePost from "./CompanyCreatePost";
import CompanyPostsDetails from "./companyPostsDetails";
import axios from "axios";

const CompanyPosts = ({ loggedUser }) => {
  const [posts, setPosts] = useState([]);

  const companyName = loggedUser?.company?.name || "Your Company";
  const companyId = loggedUser?.company?.id;
  const companyLogo = loggedUser?.company?.logo;

  useEffect(() => {
    const fetchCompanyPosts = async () => {
      try {
        const companyId="20f970d2-7933-41db-af9e-9fb987a11a1e"
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/company/${companyId}/updates`)
        setPosts(res.data);
        console.log("Company posts:", posts);
      } catch (error) {
        console.error("Error fetching company posts:", error);
      }
    };

     fetchCompanyPosts();
  }, []);

  return (
    <div className="space-y-4">
     
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <CompanyPostsDetails
            key={post.id}
            post={post}
            companyLogo={companyLogo}
          />
        ))
      )}
    </div>
  );
};

export default CompanyPosts;
