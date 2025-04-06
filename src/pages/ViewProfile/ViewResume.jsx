import React from "react";
import ViewResumeManager from "./ViewResumeManager"; 



const ViewResume = ({ loggedUser }) => {
  console.log("Logged User in resume:", loggedUser.id);
  return (
    <div className="flex justify-center mt-6">
      <div className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        <h2 className="font-semibold text-gray-900">Resume</h2>

        {/* Resume Manager Component */}
        <ViewResumeManager userId={loggedUser.id} onResumesUpdated={() => {}} />
      </div>
    </div>
  );
};

export default ViewResume;
