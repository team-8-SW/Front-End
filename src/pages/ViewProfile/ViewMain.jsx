import React, { useEffect, useState } from 'react';
import { Typography, Card } from "@material-tailwind/react";
import ViewProfileCard from './ViewProfileCard';
import ViewExp from './ViewExp';
import ViewEdu from './ViewEdu';
import ViewSkills from './Viewskills';
import ViewResume from './ViewResume';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewMain = ({ loggedUser, setLoggedUser }) => {
  const { id: userid } = useParams();
  const [visibility, setVisibility] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`http://localhost:5000/api/profiles/me/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setProfileData(res.data);     
        console.log("profile dataaaa",res.data)     // set entire response
        setVisibility(res.data.public);    // extract and store visibility

      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        if (err.response) {
          console.log("Error status:", err.response.status);
          console.log("Error data:", err.response.data);
        }
      }
    };

    fetchProfile();
  }, [userid]);

  if (!profileData) {
    return (
      <div className="w-full text-center mt-20">
        <Typography variant="h5">Loading profile...</Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ViewProfileCard
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        profile={profileData.profile}
        userid={userid}
        token={localStorage.getItem("token")}
        connectionStatus={profileData.connectionStatus.status}
       
      />

      {visibility ? (
        <>
          <ViewExp experiences={profileData.experiences} />
          <ViewEdu education={profileData.education} />
          <ViewSkills skills={profileData.skills} />
          <ViewResume resumeUrl={profileData.profile?.resumeUrl} />

        </>
      ) : (
        <Card className='mt-10'>
          <div className='mt-6 text-center mb-6'>
            <Typography variant="h3" color="red">
              This account is private.
            </Typography>
            <Typography variant="small" color="black">
              Connect to see the full profile.
            </Typography>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViewMain;
