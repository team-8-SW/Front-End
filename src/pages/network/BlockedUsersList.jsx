import { useEffect, useState } from "react";
import axios from "axios";

const BlockedUsers = () => {
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    axios.get("/api/users/me/blocked", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setBlocked(res.data))
    .catch(err => console.error("Error loading blocked users", err));
  }, []);

  const handleUnblock = (userId) => {
    axios.post(`/api/users/${userId}/unblock`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setBlocked(prev => prev.filter(user => user.id !== userId));
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
      {blocked.map(user => (
        <div key={user.id} className="flex items-center justify-between p-3 border-b">
          <div>
            <p className="font-medium">{user.name}</p>
          </div>
          <button onClick={() => handleUnblock(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlockedUsers;
