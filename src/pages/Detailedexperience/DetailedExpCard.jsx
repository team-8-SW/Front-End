import React from 'react'
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Typography } from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import ExpData from './ExpData';
import { FaArrowLeft } from "react-icons/fa";

const DetailedEduCard = () => {
  return (
    <div className=''>

         <div className="flex justify-center mt-6"> {/* Added top margin */}
        <Card className="border border-gray-300 shadow-sm rounded-lg p-4 w-full  bg-white">
          <div className='flex flex-col gap-2'>

          
          <div className='flex justify-between'>
        <div className='flex justify-start gap-2'>
<button className="text-gray-600 hover:text-gray-800">
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <Typography variant="h3" className="font-medium text-gray-800">
                Experience
              </Typography>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
                <PlusIcon className="w-5 h-5" />
              </button>
        </div>
        <ExpData /> 
        </div>
        </Card>
      </div>

    </div>
  )
}

export default DetailedEduCard