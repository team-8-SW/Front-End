import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  fetchPendingConnections,
  acceptConnection,
  declineConnection
} from "../../services/api";
import { MdChevronLeft } from "react-icons/md";

const PendingConnectionsPage = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!token) {
          throw new Error("Authentication required");
        }

        const data = await fetchPendingConnections(token);
        console.log("Fetched pending connections:", data); // Debug log
        
        if (!data || data.length === 0) {
          setPending([]);
        } else {
          setPending(data);
        }
      } catch (err) {
        console.error("Error loading pending connections:", err);
        setError(err.message);
        
        // Redirect to login if unauthorized
        if (err.message.includes("401") || err.message.includes("authentication")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, token]);

  const handleAccept = async (id) => {
    try {
      await acceptConnection(id, token);
      setPending(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error accepting connection:", err);
      setError("Failed to accept connection. Please try again.");
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineConnection(id, token);
      setPending(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error declining connection:", err);
      setError("Failed to decline connection. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <MdChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Pending Invitations</h1>
          <span className="ml-auto text-sm text-gray-500">
            {pending.length} pending
          </span>
        </div>
      </div>
      
      <div className="divide-y">
        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        ) : pending.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">No pending invitations</h3>
            <p className="text-gray-500 mt-1">
              When someone sends you an invitation to connect, it will appear here.
            </p>
          </div>
        ) : (
          pending.map(user => (
            <div key={user.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                    {/* <img 
                      src={user.avatar || "https://via.placeholder.com/48"} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48";
                        e.target.onerror = null;
                      }}
                    /> */}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.title}</p>
                    {user.mutualConnections > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {user.mutualConnections} mutual connection{user.mutualConnections !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
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
          ))
        )}
      </div>
    </div>
  );
};

export default PendingConnectionsPage;