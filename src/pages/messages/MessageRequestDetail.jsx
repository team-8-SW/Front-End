import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MessageRequestDetail = () => {
  const { connection_id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/requests/${connection_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      setMessage(res.data);
    }).catch(err => {
      console.error("Error loading message request detail:", err);
    });
  }, [connection_id]);

  return (
    <div className="p-4">
      {message ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Message from {message.sender_name}</h2>
          <p className="text-gray-700">{message.content}</p>
          <p className="text-sm text-gray-400 mt-4">Sent at: {new Date(message.created_at).toLocaleString()}</p>
          <p className="mt-4 text-red-500">You must accept this message request to reply.</p>
        </div>
      ) : (
        <p>Loading message...</p>
      )}
    </div>
  );
};

export default MessageRequestDetail;