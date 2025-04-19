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

const VisitorsTab = ({ companyId }) => {
  const [data, setData] = useState([]);
  const [totalViews, setTotalViews] = useState(1);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      try {
                const companyId="20f970d2-7933-41db-af9e-9fb987a11a1e"
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/company/${companyId}/visitors`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const raw = response.data;
        console.log("Visitors data raw:", raw);
        setData(raw.viewsPerDay || ["x"]);
        console.log("Visitors data:", raw.viewsPerDay);
        setTotalViews(parseInt(raw.totalViews?.[0]?.total || 1));
        console.log("Total views:", raw.totalViews?.[0]?.total || 1);
      

      } catch (error) {
        console.error("Failed to fetch visitors data:", error);
        setData([]);
        setTotalViews(0);
      }
    };

     fetchVisitorsData();
  }, []);

  const labels = data.map((entry) =>
    new Date(entry.day).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })
  );
  const chartValues = data.map((entry) => Number(entry.views));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Page Views",
        data: chartValues,
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
    <div>
      <div className="bg-white border rounded-md p-4 mb-6">
        <h2 className="text-md font-semibold mb-1">Visitors Highlights</h2>
        <p className="text-sm text-gray-500 mb-4">Daily page views</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
          <div>
            <p className="text-xl font-bold">{totalViews}</p>
            <p className="text-gray-500">Total Views</p>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[15px] font-semibold">Visitors Metrics</p>
          <button className="bg-[#004b3c] text-white text-sm px-3 py-1 rounded-full">
            Page Views ▾
          </button>
        </div>
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>
    </div>
  );
};

export default VisitorsTab;
