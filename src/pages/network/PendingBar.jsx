import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPendingConnections } from "../../services/api";
import { MdChevronRight } from "react-icons/md";

const PendingConnectionsBar = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) {
          throw new Error("Authentication required");
        }
        
        const data = await fetchPendingConnections(token);
        setPending(data?.slice(0, 2) || []);
      } catch (err) {
        setError(err.message);
        setPending([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [token]);

  if (!token) {
    return (
      <div className="bg-white rounded-lg p-4 mb-4 text-sm text-gray-500">
        Sign in to view connections
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4 text-red-500">
        {error.includes("401") ? "Please login again" : error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 w-full">
      <div className="p-3 border-b">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Invitations</h2>
          {pending.length > 0 && (
            <button
              onClick={() => navigate("/network/pending")}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <span className="text-xs">Manage</span>
              <MdChevronRight className="ml-1" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3">
        {pending.length === 0 ? (
          <p className="text-gray-500 text-sm py-2">No pending invitations</p>
        ) : (
          <div className="space-y-3">
            {pending.map(user => (
              <div key={user.id} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                  <img
                    src={user.avatar || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40";
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingConnectionsBar;