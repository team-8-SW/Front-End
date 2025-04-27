import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MessageRequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/messages/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setRequest(response.data);
      } catch (error) {
        console.error("Error loading message request:", error);
      }
    };

    fetchRequest();
  }, [id]);

  if (!request) return <div className="p-4">Loading message request...</div>;

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Message Request</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold">From User ID: {request.sender_id}</h3>
          <p className="text-gray-500">Sent: {new Date(request.sent_at).toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-6">
          <p className="text-gray-800">{request.content}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => {
              // Implement accept logic
              window.location.href = `/messages/requests/${request.id}/accept`;
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept Request
          </button>
          <button
            onClick={() => {
              // Implement decline logic
              window.location.href = `/messages/requests/${request.id}/decline`;
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageRequestDetail;