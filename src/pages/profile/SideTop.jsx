import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const SideTop = () => {
  return (
    <div>
        <Card className="mt-6 ">
      <CardBody>
<div className='flex flex-col gap-4'>
<div className='flex justify-between align-top'>
<div className='flex flex-col justify-center  gap-0'>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Profile Language
        </Typography>
        <Typography variant="paragraph" color="#00000099" className="mb-2">
          English
        </Typography>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
              <PencilIcon className="w-5 h-5" />
            </button>
</div>
    
        <hr/>   
    <div className='flex flex-col gap-0'>
    <Typography variant="h6" color="blue-gray" className="mb-2">
    Public profile & URL
        </Typography>
        <Typography variant="paragraph" color="#00000099" className="mb-2">
        www.linkedin.com/in/youssef-mansi-69b88b320
        </Typography>
    </div>

</div>
       
      </CardBody>
      
    </Card>
    </div>
  )
}

export default SideTop