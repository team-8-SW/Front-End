import { useEffect, useState } from "react";
import axios from "axios";

const ManageBlockList = () => {
  const [users, setUsers] = useState([]);
  const [blockedIds, setBlockedIds] = useState(new Set());

  useEffect(() => {
    axios.get("/api/users/me/blocked", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setBlockedIds(new Set(res.data.map(u => u.id))));

    axios.get("/api/connections", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setUsers(res.data));
  }, []);

  const toggleBlock = (userId) => {
    const isBlocked = blockedIds.has(userId);
    const url = `/api/users/${userId}/${isBlocked ? "unblock" : "block"}`;

    axios.post(url, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setBlockedIds(prev => {
        const copy = new Set(prev);
        isBlocked ? copy.delete(userId) : copy.add(userId);
        return copy;
      });
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Block List</h2>
      {users.map(user => (
        <div key={user.id} className="flex items-center justify-between p-3 border-b">
          <div>
            <p className="font-medium">{user.name}</p>
          </div>
          <button onClick={() => toggleBlock(user.id)} className={`px-3 py-1 rounded ${blockedIds.has(user.id) ? "bg-red-500 text-white" : "bg-gray-300"}`}>
            {blockedIds.has(user.id) ? "Unblock" : "Block"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageBlockList;
