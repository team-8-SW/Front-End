import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobCard from "./Jobcard";
import Sidebar from "../adminhome/SideBar";
import { api } from "../../services/profile";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/api/admin/jobs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    if (value === "flagged") {
      navigate("./FlaggedJobsPage"); 
    }
  };

  if (loading) {
    return <div className="p-6">Loading jobs...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-6">
        {/* Top Section: Title + Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Job Listings</h2>

          <select
            onChange={handleDropdownChange}
            className="border border-slate-300 rounded-md p-2 text-sm"
            defaultValue="all"
          >
            <option value="all">All Jobs</option>
            <option value="flagged">Flagged Jobs</option>
          </select>
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
