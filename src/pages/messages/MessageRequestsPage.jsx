// import { useEffect, useState } from 'react';
// import { getMessageRequests, acceptMessageRequest, declineMessageRequest } from '../../services/api';
// import { useNavigate } from 'react-router-dom';

// const MessageRequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const data = await getMessageRequests();
//         // Filter to only show requests from non-connected users
//         setRequests(data.filter(req => req.is_request));
//       } catch (error) {
//         console.error("Failed to fetch message requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleAccept = async (id) => {
//     try {
//       await acceptMessageRequest(id);
//       setRequests(prev => prev.filter(req => req.id !== id));
//       // Optionally navigate to chat with this user
//       const acceptedRequest = requests.find(req => req.id === id);
//       if (acceptedRequest) {
//         navigate(`/messages/${acceptedRequest.sender_id}`);
//       }
//     } catch (error) {
//       console.error("Failed to accept request:", error);
//     }
//   };

//   const handleDecline = async (id) => {
//     try {
//       await declineMessageRequest(id);
//       setRequests(prev => prev.filter(req => req.id !== id));
//     } catch (error) {
//       console.error("Failed to decline request:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Message Requests</h2>
//       {requests.length === 0 ? (
//         <p>No pending requests from non-connected users.</p>
//       ) : (
//         <ul className="space-y-4">
//           {requests.map((req) => (
//             <li key={req.id} className="bg-white p-4 rounded shadow">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <h3 className="font-semibold">Message from User ID: {req.sender_id}</h3>
//                   <p className="text-gray-700 mt-2">{req.content}</p>
//                   <p className="text-sm text-gray-400 mt-2">
//                     Sent at: {new Date(req.sent_at).toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="space-x-2 ml-4">
//                   <button 
//                     onClick={() => handleAccept(req.id)} 
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Accept
//                   </button>
//                   <button 
//                     onClick={() => handleDecline(req.id)} 
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Decline
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MessageRequestsPage;