// components/RecommendedJobsCard.jsx
import React, { useEffect, useState } from "react";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecommendedJobsCard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobLogos, setJobLogos] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:5000/api/jobs/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobList = res.data.jobs.slice(0, 3) || [];
        setJobs(jobList);

        // Fetch logos for these jobs
        const logos = {};
        for (const job of jobList) {
          try {
            const logoRes = await axios.get(`http://localhost:5000/api/jobs/${job.id}/logo`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            logos[job.id] = logoRes.data?.data?.logo?.logo_url || null;
          } catch (error) {
            console.error(`Error fetching logo for job ${job.id}`, error);
            logos[job.id] = null; // fallback
          }
        }
        setJobLogos(logos);
      } catch (err) {
        console.error("Failed to fetch recommended jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow w-full">
      <Typography variant="h6" className="mb-2">
        Top job picks for you
      </Typography>
      <Typography variant="small" className="text-gray-600 mb-4">
        Based on your profile, preferences, and activity like applies, searches, and saves
      </Typography>

      {jobs.map((job) => (
        <div
          key={job.id}
          className="mb-4 flex items-start gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => navigate(`/detailedjobs/${job.id}`)}
        >
          <Avatar
            src={jobLogos[job.id] || "/default-company-logo.png"}
            size="sm"
            variant="circular"
            alt="Company Logo"
          />
          <div>
            <Typography variant="small" className="text-blue-700 font-semibold">
              {job.title}
            </Typography>
            <Typography variant="small" className="text-gray-800">
              {job.company_name} · {job.location}
            </Typography>
          </div>
        </div>
      ))}

      <Button
        variant="text"
        className="text-blue-700 font-semibold hover:underline text-sm mt-4"
        onClick={() => navigate("/detailedjobs")}
      >
        Show all →
      </Button>
    </div>
  );
};

export default RecommendedJobsCard;
