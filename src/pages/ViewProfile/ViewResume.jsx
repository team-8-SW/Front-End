import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import ViewResumeItem from "./ViewResumeItem";

const ViewResume = ({ resumeUrl }) => {
  
  return (
    <div className="flex justify-center mt-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full bg-white max-w-4xl">
        <Typography variant="h6" className="font-semibold text-gray-900 mb-4">
          Resume
        </Typography>

        {resumeUrl ? (
          <ViewResumeItem url={resumeUrl} />
        ) : (
          <Typography color="gray">No resume uploaded.</Typography>
        )}
      </Card>
    </div>
  );
};

export default ViewResume;
