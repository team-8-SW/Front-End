import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Button } from "@material-tailwind/react";
import Nav2 from "../../components/Nav2";

const MainPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(location.search);
  const mode = query.get("mode");

  const searchParams = {
    keyword: query.get("keyword") || "",
    industry: query.get("industry") || "",
    location: query.get("location") || "",
  };

  const filterParams = {
    experienceLevel: query.get("experienceLevel") || "",
    company: query.get("company") || "",
    minSalary: query.get("minSalary") || "",
    maxSalary: query.get("maxSalary") || "",
  };

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let endpoint = "";
        let params = {};

        if (mode === "search") {
          endpoint = "http://localhost:5000/api/jobs/search";
          params = searchParams;
        } else if (mode === "filter") {
          endpoint = "http://localhost:5000/api/jobs/filter";
          params = filterParams;
        } else {
          endpoint = "http://localhost:5000/api/jobs/";
        }

        const { data } = await axios.get(endpoint, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobList = data.jobs || data.job || data.filteredJob || [];
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, [location.search]);

  // Fetch saved job IDs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/jobs/applicant", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ids = (data.job || []).map((job) => job.job_id);
        setSavedJobIds(ids);
      } catch (err) {
        console.error("Error fetching saved job IDs:", err);
      }
    };

    fetchSavedJobs();
  }, []);

  // Fetch selected job details when jobId in URL changes
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;
      try {
        const { data } = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSelectedJob(data.job?.[0] || null);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleToggleSaveJob = async (jobId) => {
    try {
      const isSaved = savedJobIds.includes(jobId);

      if (isSaved) {
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}/unsave`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      } else {
        await axios.post(`http://localhost:5000/api/jobs/${jobId}/save`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedJobIds((prev) => [...prev, jobId]);
      }
    } catch (err) {
      console.error("Error toggling save status:", err);
      alert("Action failed.");
    }
  };

  return (
    <>
      <Nav2 />
      <div className="flex h-[calc(100vh-60px)]">
        {/* LEFT COLUMN */}
        <Card className="w-[40%] max-w-lg overflow-y-auto bg-white border-r mt-4 ms-5">
          <div className="text-sm text-gray-600 font-semibold px-4 pt-4 pb-2">
            <Typography variant="h3" color="blue-gray">
              Top job picks for you
            </Typography>
            <Typography variant="small" color="gray">
              Based on your profile, preferences, and activity like applies, searches, and saves
            </Typography>
            <hr className="border-t border-gray-300 my-2" />
          </div>

          {jobs.length === 0 ? (
            <div className="p-4">
              <Typography variant="small" color="gray">No jobs found</Typography>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/detailedjobs/${job.id}`)}
                className="p-4 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div className="flex items-center gap-4">
                  <img src={job.logo_url} alt="" className="w-10 h-10" />
                  <div>
                    <Typography variant="h6" color="blue-gray">{job.title}</Typography>
                    <Typography variant="small" color="gray">{job.company_name}</Typography>
                    <Typography variant="small" color="gray">{job.location} · {job.employment_type}</Typography>
                  </div>
                </div>
              </div>
            ))
          )}
        </Card>

        {/* RIGHT COLUMN */}
        <div className="flex-grow p-6 bg-[#f3f2ef] overflow-y-auto">
          {selectedJob ? (
            <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
              <Typography variant="h3" color="blue-gray" className="mb-1">
                {selectedJob.title}
              </Typography>
              <Typography variant="h5" color="gray">
                {selectedJob.company_name}
              </Typography>
              <Typography variant="paragraph" className="mb-4">
                {selectedJob.location} · {selectedJob.employment_type}
              </Typography>

              <Typography variant="paragraph" className="mb-4 text-gray-800">
                {selectedJob.description}
              </Typography>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                <Typography><b>📍 Location:</b> {selectedJob.location}</Typography>
                <Typography><b>🏭 Industry:</b> {selectedJob.industry}</Typography>
                <Typography><b>💼 Experience:</b> {selectedJob.experience_level}</Typography>
                <Typography><b>⏱ Type:</b> {selectedJob.employment_type}</Typography>
                <Typography><b>💰 Salary:</b> {selectedJob.salary}</Typography>
              </div>

              <div className="flex gap-4">
                <Button color="blue">Apply</Button>
                <Button
                  variant="outlined"
                  color="blue"
                  onClick={() => handleToggleSaveJob(selectedJob.id)}
                >
                  {savedJobIds.includes(selectedJob.id) ? "Unsave" : "Save"}
                </Button>
              </div>
            </div>
          ) : (
            <Typography variant="paragraph" color="gray">
              Select a job to view details
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
