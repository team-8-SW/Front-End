import React from 'react'
import SideTop from './SideTop'
import SecondSide from './SecondSide'
import ThirdSide from './ThirdSide'

const Side = ({loggedUser}) => {
  return (
    <div className='flex flex-col gap-4'> 
        <SideTop />
        <ThirdSide loggedUser={loggedUser}/>
        {/* <ThirdSide /> */}
        <SecondSide />  
        
    </div>
  )
}

export default Side