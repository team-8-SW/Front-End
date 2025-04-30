import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { api } from "../../services/profile"; // Adjust the import path as necessary

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ContentTab = ({ companyid }) => {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("impressions");
  console.log("Company ID in analytics:", companyid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await api.get(
          `/api/company/${companyid}/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Content Data hiii:", response.data);
        const contentData = Array.isArray(response.data) ? response.data : [];
        setData(contentData);
         // Debugging line
      } catch (error) {
        console.error("Failed to fetch content data:", error);
        setData([]);
      }
    };

    
      fetchData();
    
  }, []);

  const total = (key) =>
    data.reduce((sum, entry) => sum + (entry[key] || 0), 0);

  const labels = data.map((entry) => entry.date);
  const chartValues = data.map((entry) => entry[selectedMetric]);

  const chartData = {
    labels,
    datasets: [
      {
        label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: chartValues,
        backgroundColor: "#0a66c2",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="w-full">
      {/* Summary Section */}
      <div className="bg-white border rounded-md p-4 mb-6 shadow-sm">
        <h2 className="text-md font-semibold mb-3">Content Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <p className="text-xl font-bold">{total("impressions")}</p>
            <p className="text-gray-500">Impressions</p>
          </div>
          <div>
            <p className="text-xl font-bold">{total("reactions")}</p>
            <p className="text-gray-500">Reactions</p>
          </div>
          <div>
            <p className="text-xl font-bold">{total("comments")}</p>
            <p className="text-gray-500">Comments</p>
          </div>
          <div>
            <p className="text-xl font-bold">{total("reposts")}</p>
            <p className="text-gray-500">Reposts</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border rounded-md p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[15px] font-semibold">Content Metrics</p>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
          >
            <option value="impressions">Impressions</option>
            <option value="reactions">Reactions</option>
            <option value="comments">Comments</option>
            <option value="reposts">Reposts</option>
          </select>
        </div>
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>
    </div>
  );
};

export default ContentTab;
