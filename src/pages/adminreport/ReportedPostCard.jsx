
import React from "react";
import axios from "axios";

export default function ReportedPostCard({ report, onAction }) {
  const token = localStorage.getItem("token");

  const handleResolve = async () => {

    try {
      await axios.put(`http://localhost:5000/api/admin/reports/${report.reportId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onAction();
    } catch (error) {
      console.error("Failed to resolve report:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;

    const deleteUrl =
      report.contentType === "post"
        ? `http://localhost:5000/api/admin/posts/${report.contentId}`
        : `http://localhost:5000/api/admin/comments/${report.contentId}`;

    try {
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onAction(); 
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
            <span className="font-semibold">Content ID:</span> {report.contentId}
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
