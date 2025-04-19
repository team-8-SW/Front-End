import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import FollowerModal from "./FollowerModal";
import axios from "axios";

const FollowersTab = ({ companyId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFollowersAnalytics = async () => {
      try {
        const companyId="20f970d2-7933-41db-af9e-9fb987a11a1e"
        const token = localStorage.getItem("token");
        console.log("token in followers analytics:", token);  
        const res = await axios.get(
          `http://localhost:5000/api/company/${companyId}/followers-analytics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAnalyticsData(res.data);
        console.log("Followers analytics data:", res.data);
      } catch (error) {
        console.error("Error fetching followers analytics:", error);
      }
    };

     fetchFollowersAnalytics();
  }, []);

  const followersList = analyticsData?.followersList || [];
  const newFollowersData = analyticsData?.newFollowersPerDay || [];

  const chartData = {
    labels: newFollowersData.map((entry) =>
      new Date(entry.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "New Followers",
        data: newFollowersData.map((entry) => Number(entry.count)),
        backgroundColor: "#0a66c2",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-4">
        <h2 className="text-md font-semibold mb-1">Follower highlights</h2>
        <p className="text-sm text-gray-500 mb-4">Recent follower data</p>
        <div className="grid grid-cols-3 gap-6 text-center text-sm">
          <div>
            <p className="text-xl font-bold">{analyticsData?.totalFollowers?.total || 1}</p>
            <p className="text-gray-500">Total followers</p>
          </div>
          <div>
            <p className="text-xl font-bold">{analyticsData?.newFollowersLast30days?.total || 0}</p>
            <p className="text-gray-500">New followers in last 30 days</p>
          </div>
          <div>
            <p className="text-xl font-bold">0%</p>
            <p className="text-gray-500">Change</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[15px] font-semibold capitalize">Followers Metrics</p>
          <button className="bg-[#004b3c] text-white text-sm px-3 py-1 rounded-full">
            All types ▾
          </button>
        </div>
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>

      <div className="bg-white border rounded-md p-4">
        <h2 className="text-md font-semibold mb-3">All followers</h2>

        <div className="flex gap-2 mb-4">
          <button className="bg-[#004b3c] text-white text-xs px-3 py-1 rounded-full">People</button>
          <button className="text-gray-500 border px-3 py-1 text-xs rounded-full">Pages</button>
        </div>

        <div className="space-y-3">
          {followersList.slice(0, 10).map((follower, index) => (
            <div key={index} className="flex flex-col border-b pb-2">
              <p className="font-semibold text-sm">{follower.full_name || "Unknown"}</p>
              <p className="text-xs text-gray-400">
                {new Date(follower.followed_at).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
        </div>

        <button
          className="mt-4 text-blue-600 text-sm hover:underline"
          onClick={() => setShowModal(true)}
        >
          Show all followers →
        </button>
      </div>

      {showModal && (
        <FollowerModal followers={followersList} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default FollowersTab;
