import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function JobStatsCard() {
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    approvedJobs: 0,
    pendingJobs: 0,
    rejectedJobs: 0,
    flaggedJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/analytics/jobs', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }); 
        setJobStats(response.data);
      } catch (err) {
        setError('Failed to fetch job statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchJobStats();
  }, []);

  const pieData = [
    { name: 'Approved', value: jobStats.approvedJobs },
    { name: 'Pending', value: jobStats.pendingJobs },
    { name: 'Rejected', value: jobStats.rejectedJobs },
    { name: 'Flagged', value: jobStats.flaggedJobs }
  ];

  const COLORS = ['#e74c3c', '#9b59b6', '#2ecc71', '#3498db'];

  const calculatePercentage = (value) => {
    return jobStats.totalJobs > 0 ? Math.round((value / jobStats.totalJobs) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-48 bg-slate-100 rounded mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-red-500">Error loading job statistics</h3>
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-800">Jobs</h3>
        <p className="text-sm text-slate-500">Platform Job Overview</p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Legend */}
        <div className="w-full md:w-1/2 pl-0 md:pl-6 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <div>
                  <div className="text-xl font-semibold">{calculatePercentage(item.value)}%</div>
                  <div className="text-xs text-slate-500 uppercase">{item.name} Jobs</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold">{jobStats.totalJobs}</div>
              <div className="text-sm text-slate-500">TOTAL JOBS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}