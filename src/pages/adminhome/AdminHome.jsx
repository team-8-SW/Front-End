import React from 'react';
import Sidebar from './SideBar';
import JobStatsCard from './JobsStatsCard';
import UserStatsCard from './UserStatsCard';

export default function AdminHome() {
    return (
      <div className="flex w-full h-screen">
        {/* Sidebar - Taking 1/4 of the screen width */}
        <div className="w-1/4">
          <Sidebar />
        </div>
        
        {/* Main Content Area - Taking 3/4 of the screen width */}
        <div className="w-3/4 overflow-auto">
         < JobStatsCard />
         < UserStatsCard />
        </div>
      </div>
    );
  }