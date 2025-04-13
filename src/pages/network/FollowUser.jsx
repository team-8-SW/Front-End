import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUserPage = () => {
  const [users, setUsers] = useState([]);
  const [followed, setFollowed] = useState({});

  useEffect(() => {
    axios.get("/api/following/suggestions", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => console.error("Error fetching user suggestions", err));
  }, []);

  const handleFollow = async (userId) => {
    try {
      const res = await axios.post(
        `/api/following/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );

      if (res.data.success || res.status === 200) {
        setFollowed((prev) => ({ ...prev, [userId]: true }));
      }
    } catch (error) {
      console.error("Failed to follow user", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Discover Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-3 flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              className={`px-4 py-1 rounded ${
                followed[user.id] ? "bg-gray-400" : "bg-blue-600 text-white"
              }`}
              disabled={followed[user.id]}
              onClick={() => handleFollow(user.id)}
            >
              {followed[user.id] ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUserPage;
