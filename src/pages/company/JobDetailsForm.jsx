import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Select, Option } from '@material-tailwind/react';
import axios from 'axios';
import { Card } from '@material-tailwind/react';
import { Textarea, IconButton } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const JobDetailsForm = ({ loggedUser }) => {
  const Navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const [latestJob, setLatestJob] = useState(null);
  const [jobDetails, setJobDetails] = useState({
    location: '',
    type: '',
    workplace: '',
    description: '',
    
  });

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
      const jobs = loggedUser.company?.jobs || [];
      if (jobs.length > 0) {
        setLatestJob(jobs[jobs.length - 1]);
      }
      console.log("latest job", jobs[jobs.length - 1]);
    }
  }, [loggedUser]);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latestJob) return;

    const updatedJob = { ...latestJob, ...jobDetails };

    const updatedJobs = userData.company.jobs.map(job =>
      job.id === latestJob.id ? updatedJob : job
    );

    try {
        await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
            company: { ...userData.company, jobs: updatedJobs },
          });
      alert('Job details saved!');
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  if (!latestJob) return <p>Loading job data...</p>;

  return (
    <div className='w-full flex flex-col justify-center items-center'>
<Card className='w-[60%] mt-20 '>

<div className='flex flex-col justify-center items-center gap-10 w-full mb-5'>


<div className=' flex justify-between w-full px-5 py-2'>
<Typography variant='h4' className=''>
job details
</Typography>
<Typography variant='small' className=''>
cancel
</Typography>

</div>


<form onSubmit={handleSubmit} className="flex flex-col gap-4">

<div className='flex justify-center gap-8'>


<div className='flex flex-col gap-5'>
  <div className='flex flex-col gap-2'>
    <Typography variant='small' className='text-gray-600'>job title:</Typography>
  <Input label="Job title"  placeholder={latestJob.title} disabled />
  </div>
  <div className='flex flex-col gap-2'>
    <Typography variant='small' className='text-gray-600'>location type:</Typography>
    <Select label="Employment Type" onChange={(val) => setJobDetails({ ...jobDetails, workplace: val })}>
          <Option value="Full-time">on-site</Option>
          <Option value="Part-time">hybrid</Option>
          <Option value="Internship">remote</Option>
          
        </Select>
  </div>
  <div className='flex flex-col gap-2'>
    <Typography variant='small' className='text-gray-600'>employment type:</Typography>
    <Select label="Employment Type" onChange={(val) => setJobDetails({ ...jobDetails, type: val })}>
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Internship">Internship</Option>
          <Option value="Contract">Contract</Option>
        </Select>
  </div>

        




</div>

<div className='flex flex-col gap-5'>
<div className='flex flex-col gap-2'>
    <Typography variant='small' className='text-gray-600'>company name:</Typography>
    <Input label="company name"  value={loggedUser.company.name} disabled />
  </div>
  <div className='flex flex-col gap-2'>
    <Typography variant='small' className='text-gray-600'>job location:</Typography>
    <Input label="Job Location" name="location" value={jobDetails.location} onChange={handleChange} required />

  </div>






</div>



</div>

<div className='flex flex-col gap-2'>
<Typography variant='h4' className='text-gray-600'>job description:</Typography>
<Typography variant='small' className='text-gray-600'>This will be visible to anyone who views your job post.</Typography>
<div className="relative w-[32rem] border-2 border-gray-300 rounded-md p-2">
<Textarea
  variant="static"
  name="description"  // ✅ added this line
  placeholder="job description"
  value={jobDetails.description}
  onChange={handleChange}
  rows={8}
/>

      <div className="flex w-full justify-between py-1.5">
        <IconButton variant="text" color="blue-gray" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </IconButton>
        <div className="flex gap-2">
          <Button size="sm" color="red" variant="text" className="rounded-md" onClick={()=>Navigate("/jobtitle")}>
            Cancel
          </Button>
          <Button size="sm" className="rounded-md" type='submit' >
            submit
          </Button>
        </div>
      </div>
    </div>


</div>

</form>


</div>

</Card>
    </div>
    
   
  );
};

export default JobDetailsForm;


{/* <div className="w-[80%] mt-10 mx-auto">
      <Typography variant="h4" className="mb-4">
        Add More Details for: <span className="text-blue-600">{latestJob.title}</span>
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Job Location" name="location" value={jobDetails.location} onChange={handleChange} required />

        <Select label="Employment Type" onChange={(val) => setJobDetails({ ...jobDetails, type: val })}>
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Internship">Internship</Option>
          <Option value="Contract">Contract</Option>
        </Select>

        <Input label="Experience Level" name="experience" value={jobDetails.experience} onChange={handleChange} />
        <Input label="Salary Range" name="salary" value={jobDetails.salary} onChange={handleChange} />

        <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-800 mt-4">
          Save Job Details
        </Button>
      </form>
    </div> */}