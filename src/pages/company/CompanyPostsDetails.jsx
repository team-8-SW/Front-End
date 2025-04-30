import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  HandThumbUpIcon as OutlineThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon as OutlinerepostIcon,
  PaperAirplaneIcon as ShareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { api } from "../../services/profile"; // Adjust the import path as necessary

const CompanyPostsDetails = ({ post, companyLogo, companyid }) => {
  const [companyData, setCompanyData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [commentText, setCommentText] = useState(""); // NEW: input state

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCompany = async () => {
      try {
        const res = await api.get(`/api/company/${companyid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanyData(res.data);
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };

    const fetchCommentCount = async () => {
      try {
        const res = await api.get(
          `/api/company/${post.id}/comment-count`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCommentCount(res.data.commentCount || 0);
      } catch (err) {
        console.error("Failed to fetch comment count:", err);
      }
    };

    fetchCompany();
    fetchCommentCount();
  }, [companyid, post.id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.post(
        `/api/company/${post.id}/impressions`,
        { type: "like" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLiked(true);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!commentText.trim()) return;

    try {
      await api.post(
        `/api/company/${post.id}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCommentText(""); // clear input
      setCommentCount(prev => prev + 1);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleRepost = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.post(
        `/api/company/${post.id}/reposts`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reposted successfully!");
    } catch (err) {
      console.error("Error reposting:", err);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-6 relative max-w-xl mx-auto">
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
          <h2 className="font-semibold text-gray-900">{companyData?.name}</h2>
          <p className="text-sm text-gray-500">
            {post.created_at ? new Date(post.created_at).toLocaleString() : "Just now"}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-3">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm font-semibold mb-4">
        <Button
          variant="text"
          color={isLiked ? "blue" : "gray"}
          className="flex items-center gap-1"
          onClick={handleLike}
        >
          <OutlineThumbUpIcon className="h-5 w-5" />
          {isLiked ? "Liked" : "Like"}
        </Button>

        <div className="flex items-center gap-1">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600">Comments ({commentCount})</span>
        </div>

        <Button
          variant="text"
          color="blue"
          className="flex items-center gap-1"
          onClick={handleRepost}
        >
          <OutlinerepostIcon className="h-5 w-5" />
          Repost
        </Button>

        <Button variant="text" color="blue" className="flex items-center gap-1">
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </div>

      {/* Comment Input */}
      <div className="mt-2 flex items-center gap-2">
        <Input
          label="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1"
        />
        <Button
          size="sm"
          color="blue"
          className="px-4"
          onClick={handleCommentSubmit}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CompanyPostsDetails;
