import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
          <p className="text-slate-500">{job.company_name}</p>
          <p className="text-sm text-slate-400">{job.location} • {job.workplace_type} • {job.employment_type}</p>
          <p className="text-sm text-slate-400">Experience: {job.experience_level}</p>
        </div>
        <div className="text-sm text-slate-500 mt-4 md:mt-0">
          <p>Posted: {new Date(job.posted_at).toLocaleDateString()}</p>
          <p>Expires: {new Date(job.expires_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4 text-slate-600 text-sm line-clamp-3">
        {job.description.replace(/\\n/g, " ")}
      </div>
    </div>
  );
}
