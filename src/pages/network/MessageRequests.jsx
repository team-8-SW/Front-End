import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("/api/messages/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Failed to load message requests", err));
  }, []);

  const handleAccept = async (userId) => {
    try {
      await axios.post(
        `/api/messages/accept/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRequests((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to accept message request", err);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(
        `/api/messages/reject/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRequests((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to reject message request", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Message Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No message requests at the moment.</p>
      ) : (
        <ul>
          {requests.map((user) => (
            <li
              key={user.id}
              className="border rounded p-4 mb-4 flex justify-between items-start"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="mt-2 text-gray-700 text-sm italic">"{user.message}"</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAccept(user.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(user.id)}
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageRequests;
