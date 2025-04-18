import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';

const Jobs = ({ loggedUser }) => {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/company/20f970d2-7933-41db-af9e-9fb987a11a1e/getalljob`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobsData(res.data.jobs || []);
        console.log("Jobs data:", res.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // Filter out expired jobs
  const today = new Date();
  const filteredJobs = jobsData.filter(job => {
    const expiry = new Date(job.expires_at);
    return expiry >= today;
  });

  return (
    <div className='flex flex-col items-center justify-center w-full gap-10'>

      {/* Header */}
      <Card className='w-full h-30'>
        <div className='flex flex-col justify-center w-full gap-5 m-5'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-center m-5'>
              <Typography variant="h4">Jobs</Typography>
              <Typography className="text-gray-600">
                Manage your page’s job posts.
              </Typography>
            </div>
            <div className='m-5'>
              <Button
                variant="outlined"
                className="rounded-full text-[16px] text-blue-800 p-2 border-blue-800"
                onClick={() => window.open("/jobtitle", "_blank")}
              >
                Post a job
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Jobs Listing */}
      <Card className="w-full p-5">
        <Typography variant="h5" className="mb-4">Active Job Listings</Typography>

        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/d8l4ifwwtlke7cr82jyegqony"
              alt="No jobs"
              className='w-80 h-80 mx-auto mb-4'
            />
            <Typography variant="h6">No active jobs available</Typography>
            <Typography variant="small" className="text-gray-600">
              When you post a job, it will appear here until it expires.
            </Typography>
          </div>
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
    </div>
  );
};

export default Jobs;
