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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ContentTab = ({ companyId }) => {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("impressions");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId="d4f71cd9-d8fd-41b3-825a-120b4491b012"
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/company/${companyId}/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const contentData = Array.isArray(response.data) ? response.data : [];
        setData(contentData);
        console.log("Content data:", contentData);
      } catch (error) {
        console.error("Failed to fetch content data:", error);
        setData([]); // fallback
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
    <div>
      {/* Summary Cards */}
      <div className="bg-white border rounded-md p-4 mb-6">
        <h2 className="text-md font-semibold mb-1">Content Highlights</h2>
        <div className="grid grid-cols-4 gap-6 text-center text-sm">
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

      {/* Chart */}
      <div className="bg-white border rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[15px] font-semibold">Content Metrics</p>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-[#004b3c] text-white text-sm px-3 py-1 rounded-full"
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
