import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Input } from '@material-tailwind/react';
import { MdDone } from 'react-icons/md';
import { GiStarShuriken } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobTitleBottom from './JobTitleBottom';

const JobTitleTop = ({ loggedUser }) => {
  const [newJobTitle, setNewJobTitle] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewJobTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newJobTitle.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/company/job',
        {
          title: newJobTitle,
          company_id: loggedUser.company.id, // required for your backend
          description: '',
          location: '',
          employment_type: '',
          workplace_type: '',
          experience_level: '',
          industry: '',
          salary: 0,
          expires_at: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newJob = response.data.job;
      localStorage.setItem('latestJobId', newJob.id); // Save job ID
      navigate('/jobdetails');
    } catch (err) {
      console.error('Error creating job:', err);
      alert(err.response?.data?.error || 'Failed to create job');
    }
  };

  return (
    <div className="w-full">
      <Card className="w-[80%] mt-10 mx-auto">
        <div className="mt-25">
          <div className="flex flex-col justify-center items-center gap-20">
            <div className="flex justify-center gap-4 mt-20 mb-10">
              <div className="flex flex-col justify-center gap-12 w-[50%]">
                <div className="flex flex-col gap-0">
                  <Typography variant="h1" className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                    hi  ,
                  </Typography>
                  <Typography variant="h1">find your next great hire</Typography>
                  <Typography variant="h5" className="text-gray-600">
                    86% of small businesses get a qualified candidate in one day
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography className="text-gray-600">As your AI-assistant, I can help you:</Typography>
                  <div className="flex gap-2 items-center"><MdDone className="text-green-500" /><Typography>Post faster with AI help</Typography></div>
                  <div className="flex gap-2 items-center"><MdDone className="text-green-500" /><Typography>Presort applicants</Typography></div>
                  <div className="flex gap-2 items-center"><MdDone className="text-green-500" /><Typography>Invite qualified people</Typography></div>
                </div>
              </div>

              <Card className="w-[35%] h-60 p-[1px] bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-lg">
                <div className="w-full h-full bg-white rounded-lg p-8">
                  <Typography variant="small" className="text-gray-600">Job title</Typography>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                      type="text"
                      name="title"
                      value={newJobTitle}
                      onChange={handleChange}
                      label="Job Title"
                      required
                    />
                    <Button type="submit" className="rounded-full bg-blue-900 text-white hover:bg-blue-800">
                      <div className="flex gap-2 items-center">
                        <GiStarShuriken />
                        <Typography className="text-white">Continue</Typography>
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
