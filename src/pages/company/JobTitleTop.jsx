import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Input } from '@material-tailwind/react';
import { MdDone } from 'react-icons/md';
import { GiStarShuriken } from 'react-icons/gi';
import JobTitleBottom from './JobTitleBottom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobTitleTop = ({ loggedUser }) => {
  const [userData, setUserData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [newJobTitle, setNewJobTitle] = useState('');
    const Navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
      setJobsData(loggedUser.company?.jobs || []);
    }
  }, [loggedUser]);

  const handleChange = (e) => {
    setNewJobTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newJobTitle.trim() === '') return;
  
    const newJob = { id: jobsData.length + 1, title: newJobTitle };
    const updatedJobs = [...jobsData, newJob];
  
    try {
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        company: { ...userData.company, jobs: updatedJobs },
      });
  
      // ✅ Update local state immediately
      const updatedUser = {
        ...userData,
        company: { ...userData.company, jobs: updatedJobs },
      };
  
      setUserData(updatedUser);
      setJobsData(updatedJobs);
  
    
    } catch (error) {
      console.error('Error updating jobs:', error);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="w-full">
      <Card className="w-[80%] mt-10 mx-auto">
        <div className="mt-25">
          <div className="flex flex-col justify-center items-center gap-20">
            <div className="flex justify-center gap-4 mt-20 mb-10">
              <div className="flex flex-col justify-center gap-12 w-[50%]">
                <div className="flex flex-col justify-center gap-0">
                  <Typography variant="h1" className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                    hi {userData.fname} ,
                  </Typography>
                  <Typography variant="h1">find your next great hire</Typography>
                  <Typography variant="h5" className="text-gray-600">
                    86% of small businesses get a qualified candidate in one day
                  </Typography>
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <Typography variant="text" className="text-gray-600">As your AI-assistant, I can help you:</Typography>
                  <div className="flex gap-2 items-center">
                    <MdDone className="text-green-500 text-[24px]" />
                    <Typography variant="text" className="text-gray-600">Post a job faster by drafting a job description</Typography>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MdDone className="text-green-500 text-[24px]" />
                    <Typography variant="text" className="text-gray-600">Quickly presort applicants according to your criteria*</Typography>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MdDone className="text-green-500 text-[24px]" />
                    <Typography variant="text" className="text-gray-600">Find up to 25 qualified people on LinkedIn per day to invite to apply*</Typography>
                  </div>
                </div>
              </div>

              <Card className="w-[35%] h-60 self-start relative p-[1px] bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-lg">
                <div className="w-full h-full bg-white rounded-lg p-8 pb-8">
                  <Typography variant="small" className="text-gray-600">Job title</Typography>
                  <form onSubmit={handleSubmit} className="flex flex-col justify-between">
                    <Input
                      type="text"
                      name="title"
                      value={newJobTitle}
                      onChange={handleChange}
                      label="Job Title"
                      required
                    />
                    <Button variant="outlined" className="rounded-full mt-5 bg-blue-900 text-white hover:bg-blue-800" type="submit" onClick={()=>Navigate("/jobdetails")}>
                      <div className="flex gap-2 items-center">
                        <GiStarShuriken className="text-white text-[24px]" />
                        <Typography variant="small" className="text-white">continue with my job</Typography>
                      </div>
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            <JobTitleBottom />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobTitleTop;