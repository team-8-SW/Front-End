import React from "react";
import ResumeManager from "./ResumeManager";

const Resume = ({ loggedUser }) => {
  if (!loggedUser) {
    return <p>Loading user data...</p>;
  }

  const resumeUrl = loggedUser?.profile?.resumeUrl || null;

  return (
    <div className="flex justify-center mt-6">
      <div className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white">
        <h2 className="font-semibold text-gray-900">Resume</h2>

        {/* Resume Manager Component */}
        <ResumeManager resumeUrl={resumeUrl} />
      </div>
    </div>
  );
};

export default Resume;
