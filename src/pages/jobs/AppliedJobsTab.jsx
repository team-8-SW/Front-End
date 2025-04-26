import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AppliedJobsTab = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/jobs/applicantions/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const applications = data.applications || [];

        for (const app of applications) {
          await fetchJobDetailsWithStatus(app.job_id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const fetchJobDetailsWithStatus = async (jobId) => {
    try {
      const [jobRes, statusRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/jobs/${jobId}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const jobDetails = jobRes.data.job?.[0];
      const status = statusRes.data.status;

      if (jobDetails) {
        setAppliedJobs((prev) => [...prev, { ...jobDetails, status }]);
      }
    } catch (err) {
      console.error(`Error fetching job/status for job ID ${jobId}:`, err);
    }
  };

  if (loading) {
    return <Typography className="text-center mt-6 text-gray-600">Loading applied jobs...</Typography>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center py-16">
        <img
          src="https://static.licdn.com/aero-v1/sc/h/28dki44pe9dwzlqn49qbmvbcl"
          alt="No jobs"
          className="mx-auto w-64 mb-4"
        />
        <Typography variant="h5" className="mb-2">No recent job activity</Typography>
        <Typography color="gray">You haven’t applied to any jobs yet.</Typography>
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
      {appliedJobs.map((job) => (
        <Card
          key={job.id}
          className="p-4 border shadow cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/detailedjobs/${job.id}`)}
        >
          <div className="flex justify-between items-start">
            <div>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="small" color="gray">{job.company_name}</Typography>
              <Typography variant="small" color="gray">{job.location} · {job.employment_type}</Typography>
              <Typography variant="small" color="gray">{job.salary}</Typography>
            </div>
            <Chip value={job.status} color="blue-gray" className="capitalize" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppliedJobsTab;
