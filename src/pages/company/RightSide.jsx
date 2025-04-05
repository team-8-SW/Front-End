import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Card } from "@material-tailwind/react";


import { useState } from 'react';



const RightSide = () => {
  return (
    <div className='w-full h-12'>
        <Card>
            <Typography variant='h4' className='text-center'>
                right side
            </Typography>
        </Card>
    </div>
  )
}

export default RightSide