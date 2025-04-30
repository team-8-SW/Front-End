
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../adminhome/SideBar";
import { api } from "../../services/profile";

export default function MostReportedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMostReported = async () => {
      try {
        const response = await api.get("/api/admin/analytics/most-reported", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch most reported content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMostReported();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Most Reported Content</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-slate-500">No reported content found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.map((item, index) => (
              <div
                key={item.contentId}
                className="bg-white shadow rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-slate-800">Type: {item.type}</p>
                  <p className="text-sm text-slate-500">Content ID: {item.contentId}</p>
                </div>
                <div className="text-lg font-bold text-red-600">{item.reportCount} Reports</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
