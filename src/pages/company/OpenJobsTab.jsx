import React from 'react'
import { Card, Typography, Button } from "@material-tailwind/react";

const OpenJobsTab = ({ jobsData, loggedUser }) => {
  const openJobs = jobsData.filter(job => job.status === "open");

  if (openJobs.length === 0) {
    return (
      <div className='w-full'>
        <Card className='w-full'>
          <div className='flex flex-col items-center justify-center w-full gap-5 m-5'>
            <div>
              <img src="/photos/dlfmsfzpj4m0vmjwxlx61w0c4.gif" alt="" className='w-80 h-80' />
            </div>

            <Typography variant="h4" className="text-center">
              You haven’t posted any jobs yet
            </Typography>

            <Typography variant="small" className="text-center text-gray-600">
              Post a job in minutes and reach qualified candidates you can’t find anywhere else.
            </Typography>

            <Button
              variant="outlined"
              className="rounded-full text-[16px] text-blue-800 p-2 border-blue-800"
              onClick={() => window.open("/jobtitle", "_blank")}
            >
              post a job
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ✅ Render all open jobs in a single card
  return (
    <div className="w-full">
      <Card className="w-full p-5">
        
        <div className="flex flex-col gap-4">
          {openJobs.map((job) => (
            <div key={job.id} className="border-b pb-3">
              <Typography variant="h6">{job.title || "Untitled Job"}</Typography>
              <Typography className="text-gray-700">Full-time</Typography>
              <Typography className="text-sm text-gray-600">
                El Sheikh Zaid, Al Jizah, Egypt (On-site)
              </Typography>
              <Typography className="text-sm text-gray-500 mt-1">
                Created by <span className="font-semibold">{loggedUser.fname} {loggedUser.lname}</span> on {new Date().toLocaleDateString()}
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OpenJobsTab;
