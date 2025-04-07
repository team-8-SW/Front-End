import React from 'react'
import SideTop from './SideTop'
import SecondSide from './SecondSide'

const ViewSide = () => {
  return (
    <div className='flex flex-col gap-4'> 
        <SideTop />
        <SecondSide />  
    </div>
  )
}

export default ViewSide