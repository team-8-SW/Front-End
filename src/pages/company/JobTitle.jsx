import { Card, Typography } from '@material-tailwind/react'
import React, { use } from 'react'
import { Avatar } from "@material-tailwind/react";
import JobTitleNav from './JobTitleNav';
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import { GiStarShuriken } from "react-icons/gi";
import JobTitleTop from './JobTitleTop';
import JobTitleBottom from './JobTitleBottom';
import { useParams } from 'react-router-dom';




const JobTitle = ({loggedUser}) => {
  const {companyid} = useParams();
  return (
    <div className='w-full flex flex-col justify-center items-center '>
       
      


    
    <div className='w-[90%] flex flex-col justify-center items-center ml-40'>


<JobTitleTop  loggedUser={loggedUser} companyid={companyid}/>






    </div>



    </div>
  )
}

export default JobTitle