import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  
  import React from "react";
  import { Bar } from "react-chartjs-2";
  
  const FollowersTab = ({ data }) => {
    const chartData = {
      labels: data?.months || [],
      datasets: [
        {
          label: "Sponsored",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#0a66c2",
          borderRadius: 4,
        },
        {
          label: "Organic",
          data: data?.data || [],
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
      <div>
        <div className="bg-white border rounded-md p-4 mb-6">
          <h2 className="text-md font-semibold mb-1">Followers Highlights</h2>
          <p className="text-sm text-gray-500 mb-4">Data for 3/4/2025 - 4/2/2025</p>
          <div className="grid grid-cols-3 gap-6 text-center text-sm">
            <div><p className="text-xl font-bold">{data?.total || 0}</p><p className="text-gray-500">Total followers</p></div>
            <div><p className="text-xl font-bold">{data?.data?.slice(-1)[0] || 0}</p><p className="text-gray-500">New followers</p></div>
            <div><p className="text-xl font-bold">0%</p><p className="text-gray-500">Change</p></div>
          </div>
        </div>
        <div className="bg-white border rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[15px] font-semibold">Followers Metrics</p>
            <button className="bg-[#004b3c] text-white text-sm px-3 py-1 rounded-full">All types ▾</button>
          </div>
          <Bar data={chartData} options={chartOptions} height={120} />
        </div>
      </div>
    );
  };
  
  export default FollowersTab;