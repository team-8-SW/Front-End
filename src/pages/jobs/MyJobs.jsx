import React from "react";
import LeftMyJobsCard from "./LeftMyJobsCard";
import CenterMyjobsContent from "./centerMyJobsContent";




const MyJobs = () => {
  return (
    <div className="flex gap-6 bg-[#f3f2ef] px-6 py-6 min-h-screen">
      <div className="w-1/4">
        <LeftMyJobsCard />
      </div>
      <div className="w-3/4">
        <CenterMyjobsContent />
      </div>
    </div>
  );
};

export default MyJobs;
