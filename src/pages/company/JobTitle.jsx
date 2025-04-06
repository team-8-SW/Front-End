import { Card, Typography } from '@material-tailwind/react'
import React from 'react'
import { Avatar } from "@material-tailwind/react";
import JobTitleNav from './JobTitleNav';
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import { GiStarShuriken } from "react-icons/gi";
import JobTitleTop from './JobTitleTop';
import JobTitleBottom from './JobTitleBottom';




const JobTitle = ({loggedUser}) => {
  return (
    <div className='w-full flex flex-col justify-center items-center '>
       
        <Card className='w-full h-[40px] '>
            

            <div className='flex justify-between '>
            <Typography variant='small' className='text-center'>
        Manage Job Posts
    </Typography>
    <Typography variant='small' className='text-center text-gray-600'>
        Create and manage your job posts here.
    </Typography>
            </div>
    </Card>


    
    <div className='w-[90%] flex flex-col justify-center items-center ml-40'>


<JobTitleTop  loggedUser={loggedUser}/>






    </div>



    </div>
  )
}

export default JobTitle