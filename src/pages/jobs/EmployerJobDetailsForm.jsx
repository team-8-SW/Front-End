import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
  Card,
  Textarea
} from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobDetailsForm = ({ loggedUser }) => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: '',
    workplace_type: '',
    experience_level: '',
    industry: '',
    salary: '',
    expires_at: ''
  });

  useEffect(() => {
    const storedTitle = localStorage.getItem("latestJobTitle");
    if (storedTitle) {
      setJobDetails(prev => ({ ...prev, title: storedTitle }));
    }
  }, []);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!jobDetails.title || !loggedUser?.id) {
      return alert("Missing required fields.");
    }

    try {
      const payload = {
        user_id: loggedUser.id,
        company_name: loggedUser?.profile?.company_name || null,
        title: jobDetails.title,
        description: jobDetails.description,
        location: jobDetails.location,
        employment_type: jobDetails.employment_type,
        workplace_type: jobDetails.workplace_type,
        experience_level: jobDetails.experience_level,
        industry: jobDetails.industry,
        salary: parseInt(jobDetails.salary),
        expires_at: new Date(jobDetails.expires_at).toISOString(),
      };

      console.log("Posting job:", payload);

      await axios.post("http://localhost:5000/api/jobs/post-job", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Job posted successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error("Error posting job:", error);
      alert(error?.response?.data?.error || "Failed to post job");
    }
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Card className='w-[60%] mt-20 p-6'>
        <div className='flex justify-between'>
          <Typography variant='h4'>Post a Job</Typography>
          <Button variant='text' color='red' onClick={() => navigate("/jobs")}>Cancel</Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <Input
            label="Job Title"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            disabled
          />

          <div className='flex gap-6'>
            <Input
              label="Location"
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Salary (USD)"
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
            />
          </div>

          <div className='flex gap-6'>
            <Select
              label="Employment Type"
              value={jobDetails.employment_type}
              onChange={(val) => setJobDetails(prev => ({ ...prev, employment_type: val }))}
            >
              <Option value="full-time">Full-time</Option>
              <Option value="part-time">Part-time</Option>
              <Option value="contract">Contract</Option>
            </Select>

            <Select
              label="Workplace Type"
              value={jobDetails.workplace_type}
              onChange={(val) => setJobDetails(prev => ({ ...prev, workplace_type: val }))}
            >
              <Option value="On-site">On-site</Option>
              <Option value="Remote">Remote</Option>
              <Option value="Hybrid">Hybrid</Option>
            </Select>
          </div>

          <div className='flex gap-6'>
            <Select
              label="Experience Level"
              value={jobDetails.experience_level}
              onChange={(val) => setJobDetails(prev => ({ ...prev, experience_level: val }))}
            >
              <Option value="Entry">Entry</Option>
              <Option value="Mid-level">Mid-level</Option>
              <Option value="Senior">Senior</Option>
              <Option value="Executive">Executive</Option>
            </Select>

            <Input
              label="Industry"
              name="industry"
              value={jobDetails.industry}
              onChange={handleChange}
            />
          </div>

          <Input
            type="date"
            label="Expires At"
            name="expires_at"
            value={jobDetails.expires_at}
            onChange={handleChange}
          />

          <Textarea
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            rows={4}
            label="Job Description"
            placeholder="Describe the responsibilities, requirements, etc."
          />

          <Button type="submit" color="blue" className="self-end">
            Submit Job
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JobDetailsForm;
