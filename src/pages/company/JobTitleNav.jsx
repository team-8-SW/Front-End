import React from 'react'
import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
  } from "@material-tailwind/react";
  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const JobTitleNav = () => {
  return (
    <div>
         <div className='w-full text-black'
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Material Tailwind
        </Typography>
        <Typography
         
          variant="small"
          
        >
          Manage Job Posts

        </Typography>
       
      </div>
    </div>
    </div>
  )
}

export default JobTitleNav