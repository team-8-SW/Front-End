import React from "react";
import axios from "axios";

export default function JobCard({ job, onDelete }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/jobs/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onDelete(); 
    } catch (error) {
      console.log("Failed to delete job:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
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

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 text-slate-600 text-sm">
        {job.description.replace(/\\n/g, " ")}
      </div>
    </div>
  );
}
