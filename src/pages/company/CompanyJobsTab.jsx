// src/pages/company/CompanyJobsTab.jsx
import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const CompanyJobsTab = ({ jobs }) => {
  const today = new Date();

  const filteredJobs = jobs.filter((job) => {
    const expiry = new Date(job.expires_at);
    return expiry >= today;
  });

  return (
    <Card className="p-6 bg-white shadow-sm">
      <Typography variant="h6" className="mb-4">Open Positions</Typography>

      {filteredJobs.length === 0 ? (
        <Typography className="text-center text-gray-500">
          No active job listings.
        </Typography>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border-b pb-4">
              <Typography variant="h6" className="text-blue-900">
                {job.title || "Untitled Job"}
              </Typography>

              <Typography className="text-gray-800 font-medium mt-1">
                {job.industry || "Industry not set"} · {job.experience_level || "Experience level not set"}
              </Typography>

              <Typography className="text-sm text-gray-600 mt-1">
                {job.location || "Location not set"} ({job.workplace_type || "Workplace type not set"})
              </Typography>

              <Typography className="text-sm text-gray-600">
                Employment: {job.employment_type || "N/A"} · Salary: {job.salary ? `$${job.salary}` : "Not specified"}
              </Typography>

              <Typography className="text-sm text-gray-500 mt-1">
                Posted on: {new Date(job.created_at || job.posted_at || Date.now()).toLocaleDateString()}
              </Typography>

              <Typography className="text-sm text-gray-500">
                Expires at: {job.expires_at ? new Date(job.expires_at).toLocaleDateString() : "Not set"}
              </Typography>

              <Typography className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                {job.description || "No job description provided."}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CompanyJobsTab;
