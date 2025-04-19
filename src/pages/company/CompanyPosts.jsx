import React, { useEffect, useState } from "react";
import CompanyCreatePost from "./CompanyCreatePost";
import CompanyPostsDetails from "./companyPostsDetails";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompanyPosts = ({ loggedUser }) => {
  const [posts, setPosts] = useState([]);

  const companyName = loggedUser?.company?.name || "Your Company";
  const companyId = loggedUser?.company?.id;
  const companyLogo = loggedUser?.company?.logo;
  const {companyid}=useParams()
  const [companyData, setCompanyData] = useState("");
  console.log("Company ID in CompanyPosts:", companyid); // ✅ Log loggedUser

  useEffect(() => {
    const fetchCompanyPosts = async () => {
      try {
        const companyId="20f970d2-7933-41db-af9e-9fb987a11a1e"
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/company/${companyid}/updates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(res.data);
        console.log("Company posts data:", res.data); // Log the response data
        
        console.log("Company posts:", posts);
      } catch (error) {
        console.error("Error fetching company posts:", error);
      }
    };

     fetchCompanyPosts();
  }, []);
  useEffect(() => {
    const fetchLatestCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/company/${companyid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const companies = res.data;
        
        
          // Get the last created company (optionally sort if backend doesn’t return ordered)
          
          setCompanyData(companies);
          console.log("Latest company data in posts:", companies);
        
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };

    fetchLatestCompany();
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
            companyLogo={companyData.logo_url}
            companyid={companyid}
          />
        ))
      )}
    </div>
  );
};

export default CompanyPosts;
