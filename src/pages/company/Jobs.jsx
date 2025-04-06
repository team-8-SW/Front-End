import React from 'react'

import { Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";


const Jobs = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-10'>

<Card className='w-full h-30'>
    
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

</Card>
<Card className='w-full '>
    <div className='flex flex-col items-center justify-center w-full gap-5 m-5'>

        <div>
            {/* video */}
            <img src="\photos\dlfmsfzpj4m0vmjwxlx61w0c4.gif" alt="" className='w-80 h-80' />
        </div>

<Typography variant="h4" className="text-center">
You haven’t posted any jobs yet
        </Typography>

        <Typography variant="small" className="text-center text-gray-600 ">
           Post a job in minutes and reach qualified candidates you can’t find anywhere else.
        </Typography>
        <div className=''>
    <Button variant="outlined" className="rounded-full text-[16px] text-blue-800 p-2 border-blue-800" onClick={() => window.open("/jobtitle", "_blank")}>
        post a job
      </Button>
    </div>

    </div>

</Card>


    </div>
  )
}

export default Jobs