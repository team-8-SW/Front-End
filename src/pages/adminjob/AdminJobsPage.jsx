import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./Jobcard";
import Sidebar from "../adminhome/SideBar";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/jobs", {
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
        <h2 className="text-2xl font-semibold mb-6">Job Listings</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
