
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportedPostCard from "./ReportedPostCard";
import Sidebar from "../adminhome/SideBar";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");


  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReports(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div className="p-6">Loading reported content...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex">
    
      <Sidebar />

      {/* Page Content Section */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reported Content</h2>
        </div>

        
        <div className="flex flex-col gap-6">
          {reports.length > 0 ? (
            reports.map((report) => (
              <ReportedPostCard key={report.reportId} report={report} onAction={fetchReports} />
            ))
          ) : (
            <p className="text-slate-500">No reported content found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
