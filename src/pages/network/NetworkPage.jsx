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
     

      {/* Right Pending Bar */}
      <div className="w-3/4 p-4">
        <Pendingbar />
      </div>
    </div>
  );
};

export default NetworkPage;