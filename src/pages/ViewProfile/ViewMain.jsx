import React from 'react';
import { Typography,Card } from "@material-tailwind/react";
import ViewProfileCard from './ViewProfileCard';
import ViewExp from './ViewExp';
import ViewEdu from './ViewEdu';
import ViewSkills from './Viewskills';
import ViewResume from './ViewResume';

const ViewMain = ({ loggedUser, setLoggedUser }) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <ViewProfileCard loggedUser={loggedUser} setLoggedUser={setLoggedUser} />

        {loggedUser.privacy === "public" ? (
          <>
            <ViewExp loggedUser={loggedUser} />
            <ViewEdu loggedUser={loggedUser} />
            <ViewSkills loggedUser={loggedUser} />
            <ViewResume loggedUser={loggedUser} />
          </>
        ) : (
          <Card className='mt-10'>
            <div className='mt-6 text-center mb-6 '>
              <Typography variant="h3" color="red" className="">
            This account is private.
          </Typography>
          <Typography variant="small" color="black" className="">
            connect to see the full profile
          </Typography>
          </div>
 
          </Card>
         
        )}
      </div>
    </div>
  );
};

export default ViewMain;
