import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsOverview() {
  const [range, setRange] = useState("daily");
  const [data, setData] = useState({ newUsers: 0, newJobListings: 0, newPosts: 0 });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOverview = async (selectedRange) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/analytics/overview?range=${selectedRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching overview analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(range);
  }, [range]);

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full md:max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Analytics Overview</h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded px-2 py-1 text-sm text-slate-700"
        >
          <option value="daily">Today</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-slate-500 text-sm">New Users</p>
            <p className="text-xl font-bold text-slate-800">{data.newUsers}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">New Job Listings</p>
            <p className="text-xl font-bold text-slate-800">{data.newJobListings}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">New Posts</p>
            <p className="text-xl font-bold text-slate-800">{data.newPosts}</p>
          </div>
        </div>
      )}
    </div>
  );
}
