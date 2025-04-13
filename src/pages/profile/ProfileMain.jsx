import React from 'react'
import ProfileCard from './ProfileCard'
import SkillsCard from './SkillsCard'
import Exp from './Exp'
import Education from './Education' 
import Resume from './Resume'

const Main = ({loggedUser,setLoggedUser}) => {

  return (
    <div className='w-full '>
        <div className='w-full'>
        <ProfileCard  loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
        <div className='mb-5'>
        <Exp loggedUser={loggedUser}/>
        </div>
      
        <Education  loggedUser={loggedUser}/>

        <SkillsCard loggedUser={loggedUser} />  
        <Resume loggedUser={loggedUser} />

        </div>
        
    </div>
  )
}

export default Main