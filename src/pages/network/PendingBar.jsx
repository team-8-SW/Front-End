import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  fetchPendingConnections,
  acceptConnection,
  declineConnection
} from "../../services/api";

import { MdChevronRight } from "react-icons/md";

const PendingConnectionsBar = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleAccept = async (id) => {
    try {
      await acceptConnection(id); // Removed token parameter
      setPending(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error accepting connection:", err);
      setError("Failed to accept connection. Please try again.");
    }
  };
  
  const handleDecline = async (id) => {
    try {
      await declineConnection(id); // Removed token parameter
      setPending(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error declining connection:", err);
      setError("Failed to decline connection. Please try again.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) {
          throw new Error("Authentication required");
        }
        const data = await fetchPendingConnections(token);
        setPending(data || []);
      } catch (err) {
        setError(err.message);
        setPending([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const renderInvitationItem = (user) => (
    <div key={user.id} className="flex items-start p-4 hover:bg-gray-50">
      <div className="flex-shrink-0 mr-4">
        <img
          src={user.avatar /*|| "https://via.placeholder.com/56"*/}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover"
          onError={(e) => {
            //e.target.src = "https://via.placeholder.com/56";
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.title}</p>
            {user.mutualConnections && (
              <p className="text-xs text-gray-500 mt-1">
                {user.mutualConnections} mutual connection{user.mutualConnections !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
          <button
                    onClick={() => handleAccept(user.id)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(user.id)}
                    className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition"
                  >
                    Decline
                  </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Invitations ({loading ? '...' : pending.length})
        </h2>
        {!loading && (
          <button
            onClick={() => navigate("/network/pending")}
            className={`font-medium text-sm hover:underline flex items-center ${
              pending.length > 0 ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {pending.length > 0 ? "Show all" : "Manage"}
            <MdChevronRight className="ml-1" size={18} />
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
        {loading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 text-sm">
            {error.includes("401") ? "Please login again" : error}
          </div>
        ) : pending.length === 0 ? (
          <div className="p-4 text-gray-500 text-sm">
            No pending invitations
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pending.slice(0, 3).map(renderInvitationItem)}
            {pending.length > 3 && (
              <div className="p-4 text-center">
                <button 
                  onClick={() => navigate("/network/pending")}
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  Show all {pending.length} invitations
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingConnectionsBar;