// import React from 'react';

// const ConversationList = ({ connections, onSelect, selectedId }) => {
    
//   return (
//     <div className="w-1/3 border-r overflow-y-auto">
//       {connections.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => onSelect(user)}
//           className={`cursor-pointer p-4 flex items-center hover:bg-gray-100 ${
//             selectedId === user.id ? 'bg-gray-200' : ''
//           }`}
//         >
//           <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
//             {user.avatarUrl ? (
//               <img src={user.avatarUrl} alt={user.name} className="rounded-full w-full h-full object-cover" />
//             ) : (
//               <span className="text-sm text-white">{user.name[0]}</span>
//             )}
//           </div>
//           <div>
//             <p className="font-medium">{user.name}</p>
//             {user.title && <p className="text-sm text-gray-500">{user.title}</p>}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ConversationList;
