// src/components/JobCard.jsx

import React from "react";
import axios from "axios";
import { api } from "../../services/profile";

export default function JobCard({ job, onDelete }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {

    try {
      await api.delete(`/api/admin/jobs/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onDelete();
    } catch (error) {
      console.log("Failed to delete job:", error);
      
    }
  };

  const handleUpdateStatus = async (newStatus) => {

    try {
      await api.put(`/api/admin/jobs/${job.id}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onDelete();
    } catch (error) {
      console.log(`Failed to ${newStatus.toLowerCase()} job:`, error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
      {/* Top: Job Details */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
          <p className="text-slate-500">{job.company_name}</p>
          <p className="text-sm text-slate-400">
            {job.location} • {job.workplace_type} • {job.employment_type}
          </p>
          <p className="text-sm text-slate-400">Experience: {job.experience_level}</p>
        </div>

        <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
          <p className="text-sm text-slate-500">
            Posted: {new Date(job.posted_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-slate-500">
            Expires: {new Date(job.expires_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Middle: Description */}
      <div className="mt-4 text-slate-600 text-sm">
        {job.description.replace(/\\n/g, " ")}
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={() => handleUpdateStatus("Approved")}
          className="text-blue-600 font-semibold text-sm px-4 py-1.5 rounded-full border border-blue-600 hover:bg-blue-50"
        >
          Approve
        </button>

        <button
          onClick={() => handleUpdateStatus("Rejected")}
          className="text-gray-600 font-semibold text-sm px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          Reject
        </button>

        <button
          onClick={handleDelete}
          className="hover:bg-red-600  text-sm text-gray-600 font-semibold text-sm px-4 py-1.5 rounded-full border border-gray-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
