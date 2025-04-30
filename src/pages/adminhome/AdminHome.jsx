import React from 'react';
import Sidebar from './SideBar';
import JobStatsCard from './JobsStatsCard';
import UserStatsCard from './UserStatsCard';
import AnalyticsOverview from './AnalyticsOverview';

export default function AdminHome() {
    return (
      <div className="flex w-full h-screen">
        {/* Sidebar - Taking 1/4 of the screen width */}
        <div className="w-1/4">
          <Sidebar />
        </div>
        
        {/* Main Content Area - Taking 3/4 of the screen width */}
        <div className="w-3/4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  <JobStatsCard />
  <UserStatsCard />
  <AnalyticsOverview />
</div>

        </div>
      </div>
    );
  }