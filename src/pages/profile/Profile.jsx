import React from 'react'
import ProfileCard from './ProfileCard'
import Side from './Side'
import Main from './Main'

const Profile = () => {
  return (
    <div className='flex justify-center gap-10 mt-2 w-screen'>
      <div className='w-[50%]'>
      <Main /> 
      </div>
      
       <div className='w-[15%]'>
       <Side />
        </div> 
       

    </div>
  )
}

export default Profile