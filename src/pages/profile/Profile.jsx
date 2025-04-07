import React from 'react'
import ProfileCard from './ProfileCard'
import Side from './Side'
import ProfileMain from './ProfileMain'
import Footer from '../../components/Footer'  
import Nav from '../../components/Nav'

const Profile = ({loggedUser}) => {
  console.log("Logged user in Profile:", loggedUser); // ✅ Log loggedUser
  return (
    <div className='bg-[#F3F2EF] '>

    {/* <Nav /> */}
    <div className='flex flex-col items-center'>
    <div className='flex justify-center gap-10 mt-2 w-screen '>
      <div className='w-[50%]'>
      <ProfileMain loggedUser={loggedUser} /> 
      </div>
      
       <div className='w-[20%]'>
       <Side loggedUser={loggedUser}/>
        </div> 

       
        </div>
        <div className='w-[70%]'>
<Footer />  
        </div>
        </div>
    </div>
  )
}

export default Profile