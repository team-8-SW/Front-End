
import React from "react";
import axios from "axios";
import { api } from "../../services/profile";

export default function ReportedPostCard({ report, onAction }) {
  const token = localStorage.getItem("token");

  const handleResolve = async () => {

    try {
      await api.put(`/api/admin/reports/${report.reportId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onAction(report.reportId);
    } catch (error) {
      console.error("Failed to resolve report:", error);
    }
  };

  const handleDelete = async () => {
    const deleteUrl =
      report.contentType === "post"
        ? `/api/admin/posts/${report.contentId}`
        : `api/admin/comments/${report.contentId}`;

    try {
      await api.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onAction(report.reportId); 
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        {/* Left Side */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {report.contentType === "post" ? "Reported Post" : "Reported Comment"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-semibold">Content :</span> 
            {report.postContent}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            <span className="font-semibold">Reported By:</span> {report.reportedBy}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              report.status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {report.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleResolve}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md"
        >
          Resolve
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
