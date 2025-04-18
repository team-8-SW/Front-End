import React from "react";
import SideLeftBar from "./SideLeftBar";
import Pendingbar from "./PendingBar";

const NetworkPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Left Sidebar */}
      <div className="w-1/4 border-r bg-white">
        <SideLeftBar />
      </div>

      {/* Main Content */}
      <div className="w-2/4 p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Network</h1>
        {/* You can place your main network content here */}
        <p className="text-gray-600">Connections and suggestions will show here...</p>
      </div>

      {/* Right Pending Bar */}
      <div className="w-1/4 p-4">
        <Pendingbar />
      </div>
    </div>
  );
};

export default NetworkPage;