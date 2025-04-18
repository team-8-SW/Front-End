import { useEffect, useState } from "react";
import axios from "axios";

const PendingConnections = ({ loggedUser }) => {
  const [pendingConnections, setPendingConnections] = useState([]);

  useEffect(() => {
    axios.get("/api/connections/pending", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setPendingConnections(res.data))
    .catch(err => console.error("Error fetching pending connections", err));
  }, []);

  const handleAccept = (userId) => {
    axios.post(`/api/connections/${userId}/accept`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setPendingConnections(prev => prev.filter(user => user.id !== userId));
    });
  };

  const handleDecline = (userId) => {
    axios.post(`/api/connections/${userId}/decline`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setPendingConnections(prev => prev.filter(user => user.id !== userId));
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pending Connections</h2>
      {pendingConnections.map(user => (
        <div key={user.id} className="flex items-center justify-between p-3 border-b">
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.title}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleAccept(user.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Accept</button>
            <button onClick={() => handleDecline(user.id)} className="bg-gray-200 px-3 py-1 rounded">Decline</button>
          </div>
        </div>
      ))}
  </div>
  );
};

export default PendingConnections;
