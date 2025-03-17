import React from 'react'
import ProfileCard from './ProfileCard'
import SkillsCard from './SkillsCard'
import Exp from './Exp'
import Education from './Education' 

const Main = () => {
  return (
    <div className='w-full'>
        <div className='w-full'>
        <ProfileCard />
        <Exp />
        <Education />

        <SkillsCard />  
        </div>
        
    </div>
  )
}

export default Main