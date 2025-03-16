import React from 'react'
import ProfileCard from './ProfileCard'
import SkillsCard from './SkillsCard'
import Exp from './Exp'

const Main = () => {
  return (
    <div className='w-full'>
        <div className='w-full'>
        <ProfileCard />
        <Exp />
        <SkillsCard />  
        </div>
        
    </div>
  )
}

export default Main