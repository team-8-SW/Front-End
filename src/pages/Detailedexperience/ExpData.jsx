import { Typography } from '@material-tailwind/react'
import React from 'react'
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const EduData = () => {
  return (
    <div className='flex justify-between'>
<div className='flex justify-start gap-5'>
<span className='self-center'>📁</span>
<div>
    <Typography variant="h3" className="font-medium text-gray-800">
    Front-end {/* Added title */} 
    </Typography>
    <Typography variant="small" className="font-medium text-gray-800">
    freelancwe   {/* Added title */} 
    </Typography>
    <Typography variant="tesmallxt" className="font-medium text-gray-800">
    2023 - Present    {/* Added title */}       
    </Typography>
</div>
</div>
<button className="text-gray-600 hover:text-gray-800">
                <PencilIcon className="w-5 h-5" />
              </button>
    </div>
  )
}

export default EduData