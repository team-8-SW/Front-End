import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";
import { toast } from 'react-toastify';

const FollowUserPage = () => {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const [suggestionsRes, followingRes] = await Promise.all([
          axios.get("http://localhost:5000/api/following/suggestions", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/following", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(suggestionsRes.data.users || []);
        setFollowedUsers(new Set(followingRes.data.following?.map(u => u.id) || []));
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async (userId) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await axios.post(
        `http://localhost:5000/api/following/users/${userId}`,
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setFollowedUsers(prev => new Set(prev).add(userId));
        toast.success(`Following user successfully`);
      }
    } catch (error) {
      console.error("Follow error:", error);
      toast.error(error.response?.data?.message || "Failed to follow user");
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };
  const handleUnfollow = async (userId) => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await axios.delete(
        `http://localhost:5000/api/following/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setFollowedUsers(prev => {
          const updated = new Set(prev);
          updated.delete(userId);
          return updated;
        });
        toast.success("User unfollowed successfully");
      }
    } catch (error) {
      console.error("Unfollow error:", error);
      toast.error(error.response?.data?.message || "Failed to unfollow user");
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Discover Users</h2>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Discover Users</h2>
        <div className="p-4 bg-red-50 text-red-600 rounded border border-red-200">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Discover Users</h2>
      
      {users.length === 0 ? (
        <div className="p-8 text-center border rounded">
          <p className="text-gray-500">No user suggestions available</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {user.name?.charAt(0) || '?'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.title || user.email}</p>
                </div>
              </div>
              
              {processing[user.id] ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              ) : followedUsers.has(user.id) ? (
                <button
                  onClick={() => handleUnfollow(user.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Following</span>
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Follow</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowUserPage;