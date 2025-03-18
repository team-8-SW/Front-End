import React from 'react'
import DetailedExpCard from './DetailedExpCard'
import SecondSide from '../profile/SecondSide'  


const DetailsExperience = ({loggedUser}) => {
  return (
    <div className='bg-[#F3F2EF] h-screen'>
    <div className='flex justify-center gap-10 mt-2 w-screen '>
    <div className='w-[50%]'>
    <DetailedExpCard loggedUser={loggedUser} /> 
    </div>
    
     <div className='w-[20%]'>
     <SecondSide />
      </div> 
     

  </div>
  </div>
  )
}

export default DetailsExperience