import React from 'react'
import ProfileCard from './ProfileCard'
import Side from './Side'
import ProfileMain from './ProfileMain'

const Profile = () => {
  return (
    <div className='flex justify-center gap-10 mt-2 w-screen overflow-hidden'>
      <div className='w-[50%]'>
      <ProfileMain /> 
      </div>
      
       <div className='w-[20%]'>
       <Side />
        </div> 
       

    </div>
  )
}

export default Profile