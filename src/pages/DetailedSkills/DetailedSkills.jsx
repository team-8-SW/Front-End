import React from 'react'
import DetailedskillsCard from './DetailedskillsCard'
import SecondSide from '../profile/SecondSide'


const DetailedSkills = ({loggedUser}) => {
  return (
    <div className='bg-[#F3F2EF] h-screen'>
    <div className='flex justify-center gap-10 mt-2 w-screen '>
    <div className='w-[50%]'>
    <DetailedskillsCard loggedUser={loggedUser}/> 
    </div>
    
     <div className='w-[20%]'>
     <SecondSide />
      </div> 
     

  </div>
  </div>
  )
}

export default DetailedSkills