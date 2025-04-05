import React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import { Button } from "@material-tailwind/react";


const JobTitleBottom = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-12'>
        <div className='flex justify-center items-center gap-12'>
            <div className='flex flex-col justify-center items-center w-[50%]'>
            <Typography variant='h5' className='text-gray-600'>
            Rated #1 in increasing quality of hire
</Typography>
<Typography variant='h6' className='text-gray-600'>
Post your job on the world’s largest professional network and use simple tools to prioritize the most qualified candidates so you can find the people you want to interview, faster.
            </Typography>
            </div>
          <img src="\photos\Screenshot 2025-04-02 174259.png" alt="" width="128px"  height="128px"/>
        </div>
        <div className='w-[60%] text-center '>
<Typography variant='small' className='text-gray-600'>
Hiring with AI will use profile and company information to suggest job post content. *If you purchase Promoted Plus, you will get additional AI-assisted job and sourcing features. Learn more
</Typography>
<Typography variant='small' className='text-gray-600'>
Limits may apply to free job posts. View our policy
</Typography>
        </div>

    </div>
  )
}

export default JobTitleBottom