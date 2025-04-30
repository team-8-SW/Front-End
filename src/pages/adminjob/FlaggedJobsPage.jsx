import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../adminhome/SideBar";
import JobCard from "./Jobcard";
import { api } from "../../services/profile";

export default function FlaggedJobsPage() {
  const [flaggedJobs, setFlaggedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFlaggedJobs = async () => {
      try {
        const response = await api.get("/api/admin/jobs/flagged", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlaggedJobs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch flagged jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchFlaggedJobs();
  }, []);

  return (
    <div className="flex">
      
      <Sidebar />

     
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Flagged Jobs</h2>

        {loading ? (
          <p>Loading flagged jobs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : flaggedJobs.length === 0 ? (
          <p className="text-slate-500">No flagged jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flaggedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
