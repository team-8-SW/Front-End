import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

const LeftMyJobsCard = () => {
  const navigate = useNavigate();
  const [postedJobsCount, setPostedJobsCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPostedJobsCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/employer/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobs = res.data.job || [];
        setPostedJobsCount(jobs.length); // ✅ Set the count dynamically
      } catch (error) {
        console.error("Failed to fetch posted jobs count:", error);
      }
    };

    fetchPostedJobsCount();
  }, [token]);

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full font-[system-ui] text-[16px]">
      <Typography variant="h6" className="flex items-center gap-2 mb-3 text-[16px]">
        <BookmarkIcon className="w-5 h-5 text-gray-700" />
        My items
      </Typography>

      <div className="border-t pt-2">
        <div
          className="flex justify-between text-sm px-2 py-2 rounded hover:bg-gray-100 cursor-pointer font-[500]"
          onClick={() => navigate("/mypostedjobs")} // ✅ Navigate to posted jobs
        >
          <span>Posted jobs</span>
          <span className="text-blue-600 font-semibold">{postedJobsCount}</span> {/* 🔥 Dynamic */}
        </div>
        <div
          className="flex justify-between text-sm px-2 py-2 rounded hover:bg-gray-100 cursor-pointer font-[500]"
        >
          <span>My jobs</span>
          
        </div>
      </div>
    </div>
  );
};

export default LeftMyJobsCard;
