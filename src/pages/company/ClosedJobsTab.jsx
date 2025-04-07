import React from 'react';
import { Card, Typography } from "@material-tailwind/react";

const ClosedJobsTab = ({ jobsData, loggedUser }) => {
  const closedJobs = jobsData.filter(job => job.status === "closed");

  if (closedJobs.length === 0) {
    return (
      <div className='w-full'>
        <Card className='w-full'>
          <div className='flex flex-col items-center justify-center w-full gap-5 m-5'>
            <img src="https://static.licdn.com/aero-v1/sc/h/d8l4ifwwtlke7cr82jyegqony" alt="No closed jobs" className='w-80 h-80' />
            <Typography variant="h4" className="text-center">
              You have no closed jobs
            </Typography>
            <Typography variant="small" className="text-center text-gray-600">
              Once a job is filled or expired, it will appear here.
            </Typography>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="w-full p-5">
        
        <div className="flex flex-col gap-4">
          {closedJobs.map((job) => (
            <div key={job.id} className="border-b pb-3">
              <Typography variant="h6">{job.title || "Untitled Job"}</Typography>
              <Typography className="text-gray-700">{job.type || "Employment type not set"}</Typography>
              <Typography className="text-sm text-gray-600">
                {job.location || "Location not set"} ({job.workplace || "Workplace type not set"})
              </Typography>
              <Typography className="text-sm text-gray-500 mt-1">
                Created by <span className="font-semibold">{loggedUser.fname}{loggedUser.lname}</span> on {new Date().toLocaleDateString()}
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ClosedJobsTab;
