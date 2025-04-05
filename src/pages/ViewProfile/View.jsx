import React from 'react'



import Footer from '../../components/Footer'  
import Nav from '../../components/Nav'
import ViewMain from './ViewMain'

const View = ({loggedUser}) => {
  console.log("Logged user in Profile:", loggedUser); // ✅ Log loggedUser
  return (
    <div className='bg-[#F3F2EF] '>

    <Nav />
    <div className='flex flex-col items-center'>
    <div className='flex justify-center gap-10 mt-2 w-screen '>
      <div className='w-[50%]'>
      <ViewMain loggedUser={loggedUser} /> 
      </div>
      
       {/* <div className='w-[20%]'>
       <Side />
        </div>  */}

       
        </div>
        <div className='w-[70%]'>
<Footer />  
        </div>
        </div>
    </div>
  )
}

export default View