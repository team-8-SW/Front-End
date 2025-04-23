import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import SavedJobsTab from "./SavedJobsTab";
import AppliedJobsTab from "./AppliedJobsTab";

const CenterMyJobsContent = () => {
  const [activeTab, setActiveTab] = useState("Saved");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="mb-4">My Jobs</Typography>
      <div className="flex gap-3 mb-6">
        {["Saved", "Applied"].map((tab) => (
          <Button
            key={tab}
            size="sm"
            className={activeTab === tab ? "bg-green-700" : "bg-gray-200 text-gray-700"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {activeTab === "Saved" && <SavedJobsTab />}
      {activeTab === "Applied" && <AppliedJobsTab />}
    </div>
  );
};

export default CenterMyJobsContent;
