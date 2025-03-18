import React from 'react'
import ProfileCard from './ProfileCard'
import SkillsCard from './SkillsCard'
import Exp from './Exp'
import Education from './Education' 

const Main = ({loggedUser}) => {

  return (
    <div className='w-full'>
        <div className='w-full'>
        <ProfileCard  loggedUser={loggedUser}/>
        <Exp loggedUser={loggedUser}/>
        <Education  loggedUser={loggedUser}/>

        <SkillsCard loggedUser={loggedUser} />  
        </div>
        
    </div>
  )
}

export default Main