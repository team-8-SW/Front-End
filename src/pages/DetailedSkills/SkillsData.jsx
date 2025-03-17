import { Typography } from '@material-tailwind/react'
import React from 'react'
import { PencilIcon } from "@heroicons/react/24/outline";

const SkillsData = () => {
  return (
    <div>
      <div className='flex justify-between mt-3'>
      <Typography variant="h6" className="font-medium text-gray-800">
        Skills
        </Typography>
        <button className="text-gray-600 hover:text-gray-800">
                <PencilIcon className="w-5 h-5" />
              </button>

      </div>
        
        <hr className="border-t border-gray-300 my-2" />
        <div className='flex justify-between'>
      <Typography variant="h6" className="font-medium text-gray-800">
        Skills
        </Typography>
        <button className="text-gray-600 hover:text-gray-800">
                <PencilIcon className="w-5 h-5" />
              </button>

      </div>
       
    </div>
  )
}

export default SkillsData