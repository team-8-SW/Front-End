import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/profile'; // Adjust the import path as necessary

const Jobs = ({ loggedUser }) => {
  const [jobsData, setJobsData] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const { companyid } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get(
          `/api/company/${companyid}/getalljob`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const jobs = res.data.jobs || [];
        setJobsData(jobs);

        const counts = {};
        for (const job of jobs) {
          try {
            const appRes = await api.get(
              `/api/jobs/${job.id}/applications`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            counts[job.id] = appRes.data.applications?.length || 0;
          } catch {
            counts[job.id] = 0;
          }
        }
        setApplicantCounts(counts);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [companyid]);

  const today = new Date();
  const filteredJobs = jobsData.filter(job => new Date(job.expires_at) >= today);

  return (
    <div className='flex flex-col items-center justify-center w-full gap-10 px-8 py-6'>

      {/* Header */}
      <Card className='w-full p-6 shadow-lg'>
        <div className='flex justify-between items-center'>
          <div>
            <Typography variant="h4" color="blue-gray">Jobs</Typography>
            <Typography color="gray">Manage your page’s job posts.</Typography>
          </div>
          <Button
            variant="outlined"
            className="rounded-full text-blue-800 border-blue-800"
            onClick={() => window.open(`/jobtitle/${companyid}`, "_blank")}
          >
            Post a job
          </Button>
        </div>
      </Card>

      {/* Combined Card for All Jobs */}
      <Card className="w-full p-6 shadow-md">
        <Typography variant="h5" className="mb-6 text-blue-gray-700">Active Job Listings</Typography>

        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/d8l4ifwwtlke7cr82jyegqony"
              alt="No jobs"
              className='w-80 h-80 mx-auto mb-4'
            />
            <Typography variant="h6">No active jobs available</Typography>
            <Typography variant="small" color="gray">
              When you post a job, it will appear here until it expires.
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="py-4 hover:bg-gray-50 px-2 rounded transition-all cursor-pointer"
                onClick={() => navigate(`/company/${companyid}/job/${job.id}/applications`)}
              >
                <div className="flex justify-between items-start mb-1">
                  <Typography variant="h6" color="blue">{job.title || "Untitled Job"}</Typography>
                  <Chip
                    value={`${applicantCounts[job.id] ?? 0} Applicants`}
                    color="blue"
                    className="rounded-full text-xs"
                  />
                </div>

                <Typography className="text-gray-800 font-medium">
                  {job.industry || "Industry not set"} · {job.experience_level || "Experience level not set"}
                </Typography>

                <Typography className="text-sm text-gray-600">
                  {job.location || "Location not set"} ({job.workplace_type || "Workplace type not set"})
                </Typography>

                <Typography className="text-sm text-gray-600">
                  Employment: {job.employment_type || "N/A"} · Salary: {job.salary ? `$${job.salary}` : "Not specified"}
                </Typography>

                <Typography className="text-sm text-gray-500">
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
    </div>
  );
};

export default Jobs;
