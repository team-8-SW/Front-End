import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/profile"; // Adjust the import path as necessary

const SavedJobsTab = () => {
  const [detailedJobs, setDetailedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch saved job IDs and then fetch job details one by one
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data } = await api.get("/api/jobs/applicant/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const savedJobs = data.job || [];
        console.log("Saved jobs:", savedJobs);

        for (const job of savedJobs) {
          await fetchJobDetails(job.job_id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // Fetch full job details
  const fetchJobDetails = async (jobId) => {
    console.log("Fetching details for job ID:", jobId);
    try {
      const { data } = await api.get(`/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobDetails = data.job?.[0];
      if (jobDetails) {
        setDetailedJobs((prev) => [...prev, jobDetails]);
      }
    } catch (err) {
      console.error(`Error fetching details for job ${jobId}:`, err);
    }
  };

  if (loading) {
    return <Typography className="text-center mt-6 text-gray-600">Loading saved jobs...</Typography>;
  }

  if (detailedJobs.length === 0) {
    return (
      <div className="text-center py-16">
        <img
          src="https://static.licdn.com/aero-v1/sc/h/28dki44pe9dwzlqn49qbmvbcl"
          alt="No jobs"
          className="mx-auto w-64 mb-4"
        />
        <Typography variant="h5" className="mb-2">No recent job activity</Typography>
        <Typography color="gray">Find new opportunities and manage your job search progress here.</Typography>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          onClick={() => navigate("/detailedjobs")}
        >
          Search for jobs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {detailedJobs.map((job) => (
        <Card
          key={job.id}
          className="p-4 border shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/detailedjobs/${job.id}`)}
        >
          <Typography variant="h6">{job.title}</Typography>
          <Typography variant="small" color="gray">{job.company_name}</Typography>
          <Typography variant="small" color="gray">{job.location} · {job.employment_type}</Typography>
          <Typography variant="small" color="gray">{job.salary}</Typography>
        </Card>
      ))}
    </div>
  );
};

export default SavedJobsTab;
