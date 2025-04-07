import React, { use, useState } from "react";
import { Bar } from "react-chartjs-2";
import FollowerModal from "./FollowerModal";
import { useEffect } from "react";

const FollowersTab = ({ analyticsData }) => {
  const [showModal, setShowModal] = useState(false);
  const followersList = analyticsData?.followers?.list || [];
  useEffect(() => {
    if (analyticsData?.followers?.list) {
      console.log("Followers List:", analyticsData.followers.list);
    } else {
      console.log("No followers data available.");
    }
  }, [analyticsData]);


  const chartData = {
    labels: analyticsData?.followers?.months || [],
    datasets: [
      {
        label: "Sponsored",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#0a66c2",
        borderRadius: 4,
      },
      {
        label: "Organic",
        data: analyticsData?.followers?.data || [],
        backgroundColor: "#6b7280",
        borderDash: [5, 5],
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 10 } },
    },
  };

  return (
    <div className="space-y-6">
      {/* Followers Highlights */}
      <div className="bg-white border rounded-md p-4">
        <h2 className="text-md font-semibold mb-1">Follower highlights</h2>
        <p className="text-sm text-gray-500 mb-4">Data for Mar 4, 2025 – Apr 2, 2025</p>
        <div className="grid grid-cols-3 gap-6 text-center text-sm">
          <div>
            <p className="text-xl font-bold">{analyticsData.followers?.total || 0}</p>
            <p className="text-gray-500">Total followers</p>
          </div>
          <div>
            <p className="text-xl font-bold">
              {analyticsData.followers?.data?.slice(-1)[0] || 0}
            </p>
            <p className="text-gray-500">New followers in the last 30 days</p>
          </div>
          <div>
            <p className="text-xl font-bold">0%</p>
            <p className="text-gray-500">Change</p>
          </div>
        </div>
      </div>

      {/* Followers Chart */}
      <div className="bg-white border rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[15px] font-semibold capitalize">Followers Metrics</p>
          <button className="bg-[#004b3c] text-white text-sm px-3 py-1 rounded-full">
            All types ▾
          </button>
        </div>
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>

      {/* All Followers List Card */}
      <div className="bg-white border rounded-md p-4">
        <h2 className="text-md font-semibold mb-3">All followers</h2>

        <div className="flex gap-2 mb-4">
          <button className="bg-[#004b3c] text-white text-xs px-3 py-1 rounded-full">People</button>
          <button className="text-gray-500 border px-3 py-1 text-xs rounded-full">Pages</button>
        </div>

        <div className="space-y-3">
          {followersList.slice(0, 10).map((follower, index) => (
            <div key={index} className="flex flex-col border-b pb-2">
              <p className="font-semibold text-sm">{follower.name} · 3rd</p>
              <p className="text-sm text-gray-600">{follower.headline}</p>
              <p className="text-xs text-gray-400">{follower.joined}</p>
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

      {/* Modal */}
      {showModal && (
        <FollowerModal followers={followersList} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default FollowersTab;