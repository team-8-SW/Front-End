import React from 'react'
import SideTop from './SideTop'
import SecondSide from './SecondSide'
import ThirdSide from './ThirdSide'
import FourthSide from './FourthSide'

const Side = ({loggedUser}) => {
  return (
    <div className='flex flex-col gap-4'> 
        <SideTop />
        <ThirdSide loggedUser={loggedUser}/>
        <FourthSide loggedUser={loggedUser}/>
        {/* <ThirdSide /> */}
        <SecondSide />  
        
    </div>
  )
}

export default Side