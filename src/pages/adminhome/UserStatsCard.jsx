import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { UserIcon, UserCheckIcon, UserXIcon } from 'lucide-react';
import { api } from '../../services/profile';

export default function UserStatsCard() {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    suspendedUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { data } = await api.get('/api/admin/users/statistics',{
        headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserStats(data);
      } catch (err) {
        setError('Failed to fetch user statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const chartData = [
    { name: 'Total', value: userStats.totalUsers, color: '#3498db' },
    { name: 'Active', value: userStats.activeUsers, color: '#2ecc71' },
    { name: 'Suspended', value: userStats.suspendedUsers, color: '#e74c3c' }
  ];

  const activePercentage = userStats.totalUsers > 0 
    ? Math.round((userStats.activeUsers / userStats.totalUsers) * 100) 
    : 0;

  const suspendedPercentage = userStats.totalUsers > 0 
    ? Math.round((userStats.suspendedUsers / userStats.totalUsers) * 100) 
    : 0;

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
        <h3 className="text-lg font-medium text-red-500">Error loading user statistics</h3>
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-800">Users</h3>
        <p className="text-sm text-slate-500">Platform User Overview</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                formatter={(value) => [`${value} users`, 'Count']}
                contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 pl-0 md:pl-6 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Total Users */}
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <UserIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.totalUsers}</div>
                <div className="text-sm text-slate-500">TOTAL USERS</div>
              </div>
            </div>

            {/* Active Users */}
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <UserCheckIcon size={24} className="text-green-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{userStats.activeUsers}</span>
                  <span className="text-sm font-medium text-green-600">({activePercentage}%)</span>
                </div>
                <div className="text-sm text-slate-500">ACTIVE USERS</div>
              </div>
            </div>

            {/* Suspended Users */}
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <UserXIcon size={24} className="text-red-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{userStats.suspendedUsers}</span>
                  <span className="text-sm font-medium text-red-600">({suspendedPercentage}%)</span>
                </div>
                <div className="text-sm text-slate-500">SUSPENDED USERS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}