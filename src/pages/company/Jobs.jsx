import React from 'react'

import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import OpenJobsTab from './OpenJobsTab';
import ClosedJobsTab from './ClosedJobsTab';
import InReviewJobsTab from './InReviewJobsTab';


const Jobs = ({loggedUser}) => {
  const [jobsData, setJobsData] = useState({});

  const [activeTab, setActiveTab] = useState("content");
  

  useEffect(() => {
    if (loggedUser?.company?.jobs) {
      setJobsData(loggedUser.company.jobs);
    }
  }, [loggedUser]);

  const renderTabComponent = () => {
    switch (activeTab) {
      case "open":
        return <OpenJobsTab jobsData={jobsData} loggedUser={loggedUser}/>;
      case "closed":
        return <ClosedJobsTab jobsData={jobsData} loggedUser={loggedUser}/>;
        case "in review":
        return <InReviewJobsTab jobsData={jobsData} loggedUser={loggedUser}/>;
   
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full gap-10'>
    

<Card className='w-full h-30'>
  <div className='flex flex-col  justify-center w-full gap-5 m-5'>
    
<div className='flex justify-between'>
    <div className='flex flex-col justify-center m-5'>
        <Typography variant="h4" className="">
            Jobs
        </Typography>
        <Typography  className=" text-gray-600">
        Manage your page’s job posts.
        </Typography>
    </div>
    {/* button */}
    <div className=' m-5'>
    <Button variant="outlined" className="rounded-full text-[16px] text-blue-800 p-2 border-blue-800" onClick={() => window.open("/jobtitle", "_blank")}>
        post a job
      </Button>
    </div>
    

</div>

<div className="flex items-center border-b mb-4">
        {["open", "closed", "in review"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-6 text-[15px] font-medium pb-2 border-b-2 ${
              activeTab === tab
                ? "text-black border-black"
                : "text-gray-500 border-transparent hover:border-black hover:text-black"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
</div>

</Card>

{renderTabComponent()}

    </div>
  )
}

export default Jobs