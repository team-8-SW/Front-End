// components/RecommendedJobsCard.jsx
import React, { useEffect, useState } from "react";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecommendedJobsCard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
      const companyId=  "20f970d2-7933-41db-af9e-9fb987a11a1e";

        const res = await axios.get(`http://localhost:5000/api/company/${companyId}/getalljob`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.jobs.slice(0, 3)); // only show 3
      } catch (err) {
        console.error("Failed to fetch recommended jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow w-full" >
      <Typography variant="h6" className="mb-2">
        Top job picks for you
      </Typography>
      <Typography variant="small" className="text-gray-600 mb-4">
        Based on your profile, preferences, and activity like applies, searches, and saves
      </Typography>

      {jobs.map((job) => (
        <div key={job.id} className="mb-4 flex items-start gap-3">
          <Avatar src={job.logo || "https://via.placeholder.com/40"} size="sm" />
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
        className="text-blue-700 font-semibold hover:underline text-sm "
        onClick={() => navigate("/detailedjobs")}
      >
        Show all →
      </Button>
    </div>
  );
};

export default RecommendedJobsCard;
