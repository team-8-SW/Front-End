import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon as OutlinerepostIcon,
  PaperAirplaneIcon as ShareIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as SolidThumbUpIcon,
  ArrowPathRoundedSquareIcon as SolidrepostIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";


const CompanyPostsDetails = ({ post, companyLogo,companyid }) => {

const [companyData, setCompanyData] = useState("null");

  useEffect(() => {
    console.log("Company ID in CompanyPostsDetails:", companyid); // ✅ Log companyid
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
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 relative max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={companyLogo || "default-logo.png"}
            alt="Company Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{companyData.name}</h2>
          <p className="text-sm text-gray-500">
            {post.created_at ? new Date(post.created_at).toLocaleString() : "Just now"}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-3">{post.content}</p>

      {/* Action Buttons */}
      <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm font-semibold mb-4">
        <Button variant="text" color="blue" className="flex items-center gap-1 hover:text-blue-600">
          <OutlineThumbUpIcon className="h-5 w-5" />
          Like
        </Button>
        <Button variant="text" color="blue" className="flex items-center gap-1 hover:text-blue-600">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          Comment
        </Button>
        <Button variant="text" color="blue" className="flex items-center gap-1 hover:text-blue-600">
          <OutlinerepostIcon className="h-5 w-5" />
          Repost
        </Button>
        <Button variant="text" color="blue" className="flex items-center gap-1 hover:text-blue-600">
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default CompanyPostsDetails;
