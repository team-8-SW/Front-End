import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Select, Option, Card, Textarea, IconButton } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobDetailsForm = () => {
  const Navigate = useNavigate();
  const [jobId, setJobId] = useState(null);
  const [jobDetails, setJobDetails] = useState({
    location: '',
    type: '',
    workplace: '',
    description: '',
  });

  useEffect(() => {
    const storedJobId = localStorage.getItem("latestJobId");
    if (!storedJobId) return console.error("No job ID in localStorage");

    setJobId(storedJobId);
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/company/job/${storedJobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const job = res.data.job;
        setJobDetails({
          location: job.location || '',
          type: job.employment_type || '',
          workplace: job.workplace_type || '',
          description: job.description || '',
        });
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };

    fetchJobDetails();
  }, []);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your backend does not support job updates. Please create a new one.");
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Card className='w-[60%] mt-20 p-6'>
        <div className='flex justify-between'>
          <Typography variant='h4'>Job Details</Typography>
          <Button variant='text' color='red' onClick={() => Navigate("/jobtitle")}>Cancel</Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <div className='flex justify-between gap-6'>
            <div className='flex flex-col gap-4 w-1/2'>
              <Select label="Location Type" value={jobDetails.workplace} onChange={(val) => setJobDetails(prev => ({ ...prev, workplace: val }))}>
                <Option value="On-site">On-site</Option>
                <Option value="Hybrid">Hybrid</Option>
                <Option value="Remote">Remote</Option>
              </Select>

              <Select label="Employment Type" value={jobDetails.type} onChange={(val) => setJobDetails(prev => ({ ...prev, type: val }))}>
                <Option value="Full-time">Full-time</Option>
                <Option value="Part-time">Part-time</Option>
                <Option value="Internship">Internship</Option>
                <Option value="Contract">Contract</Option>
              </Select>
            </div>

            <div className='w-1/2'>
              <Input label="Job Location" name="location" value={jobDetails.location} onChange={handleChange} />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Typography variant='h6'>Job Description</Typography>
            <Textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              rows={6}
              placeholder="Job description..."
            />
          </div>

          <Button type="submit" color="blue" className="self-end">
            Save (Disabled - No PUT Support)
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JobDetailsForm;
