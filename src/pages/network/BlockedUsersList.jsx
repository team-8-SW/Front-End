import React, { useState, useEffect } from 'react';
import { getBlockedUsers, unblockUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
//import { ShieldX, Undo2 } from 'lucide-react'; // Optional icons

const BlockedUsersList = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unblockSuccess, setUnblockSuccess] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await getBlockedUsers(token);
        setBlockedUsers(response.data.blockedUsers);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blocked users');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, [token]);

  const handleUnblock = async (userId, userName) => {
    try {
      const response = await unblockUser(userId, token);
      if (response.data.message === "User unblocked successfully") {
        setBlockedUsers(blockedUsers.filter(user => user.userId !== userId));
        setUnblockSuccess(`You unblocked ${userName}.`);

        setTimeout(() => {
          setUnblockSuccess(null);
        }, 5000);
      }
    } catch (err) {
      console.error("Unblock error:", err);
      alert(err.response?.data?.message || 'Failed to unblock user');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading blocked users...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold mt-2">Blocking</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the list of people you’ve blocked on the platform.
        </p>
      </div>

      {unblockSuccess && (
        <div className="p-4 bg-green-50 text-green-700 border-b border-green-100 text-sm">
          {unblockSuccess}
        </div>
      )}

      {blockedUsers.length === 0 && (
        <div className="px-6 py-10 flex flex-col items-center text-center text-gray-600 space-y-4">
          <ShieldX className="w-12 h-12 text-gray-400" />
          <h2 className="text-lg font-semibold">You're not blocking anyone</h2>
          <p className="max-w-md text-sm">
            If you block someone, they won’t be able to view your profile or message you. You can block people from their profile page by selecting “Block” from the options menu.
          </p>
        </div>
      )}

      {blockedUsers.length > 0 && (
        <div className="divide-y divide-gray-100">
          {blockedUsers.map(user => (
            <div key={user.userId} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center space-x-4">
                {user.profilePictureUrl ? (
                  <img 
                    src={user.profilePictureUrl} 
                    alt={user.user_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">@{user.user_name}</p>
                  {user.blockedAt && (
                    <p className="text-gray-400 text-xs mt-1">
                      Blocked on {new Date(user.blockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleUnblock(user.userId, user.user_name)}
                className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 text-sm rounded-full text-gray-700 hover:bg-gray-100 transition"
              >
                <Undo2 className="w-4 h-4" />
                Unblock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedUsersList;
