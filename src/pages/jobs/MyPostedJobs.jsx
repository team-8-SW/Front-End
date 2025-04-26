import React, { useEffect, useState } from "react";
import { Card, Typography, Chip } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPostedJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/employer/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobs = res.data.job || [];
        setJobsData(jobs);

        // Fetch applications count per job
        const counts = {};
        for (const job of jobs) {
          try {
            const appRes = await axios.get(
              `http://localhost:5000/api/jobs/${job.id}/applications`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            counts[job.id] = appRes.data.applications?.length || 0;
          } catch {
            counts[job.id] = 0;
          }
        }
        setApplicantCounts(counts);
      } catch (error) {
        console.error("Failed to fetch employer jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [token]);

  if (loading) {
    return (
      <Typography className="text-center mt-10 text-gray-600">
        Loading your posted jobs...
      </Typography>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 px-8 py-6">
      {/* Header */}
      <Card className="w-full p-6 shadow-lg">
        <Typography variant="h4" color="blue-gray">My Posted Jobs</Typography>
        <Typography color="gray" className="mt-2">Manage the jobs you have posted.</Typography>
      </Card>

      {/* Jobs Listing */}
      <Card className="w-full p-6 shadow-md">
        {jobsData.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <img
              src="https://static.licdn.com/aero-v1/sc/h/d8l4ifwwtlke7cr82jyegqony"
              alt="No jobs"
              className="w-80 h-80 mx-auto mb-4"
            />
            <Typography variant="h6">No posted jobs found</Typography>
            <Typography variant="small" color="gray">
              When you post jobs, they'll appear here.
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-200">
            {jobsData.map((job) => (
              <div
                key={job.id}
                className="py-4 hover:bg-gray-50 px-2 rounded transition-all cursor-pointer"
                onClick={() => navigate(`/mypostedjobs/${job.id}/applications`)}

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
                  {job.industry || "Industry not set"} · {job.location || "Location not set"}
                </Typography>

                <Typography className="text-sm text-gray-600">
                  Employment: {job.employment_type || "N/A"} · Workplace: {job.workplace_type || "N/A"}
                </Typography>

                <Typography className="text-sm text-gray-600">
                  Salary: {job.salary ? `$${job.salary}` : "Not specified"}
                </Typography>

                <Typography className="text-sm text-gray-500">
                  Posted on: {new Date(job.posted_at || job.created_at || Date.now()).toLocaleDateString()}
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

export default MyPostedJobs;
