import React from "react";
import { Typography } from "@material-tailwind/react";

const AppliedJobsTab = () => {
  return (
    <div className="text-center py-16">
      <Typography variant="h5" className="mb-2">No recent job activity</Typography>
      <Typography color="gray">You haven’t applied to any jobs yet.</Typography>
    </div>
  );
};

export default AppliedJobsTab;
