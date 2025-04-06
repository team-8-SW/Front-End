import React, { useState } from "react";
import { Dialog, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { handleAddExperience } from "../../services/profile";
const jobTitles = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer"];
const companies = ["Google", "Microsoft", "Amazon", "Facebook"];
const locations = ["New York, USA", "London, UK", "Berlin, Germany", "Tokyo, Japan"];
const locationTypes = ["On-site", "Remote", "Hybrid"];
const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const AddExpModal = ({ open, onClose, userId, onExpAdded }) => {
  const [newExp, setNewExp] = useState({
    title: "",
    company: "",
    employmentType: "",
    locationType: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    profileHeadline: "",
    foundJobSource: ""
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExp((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExp = (event) => {
    event.preventDefault();
    if (!newExp.title.trim() || !newExp.company.trim()) {
      setError(true);
      return;
    }
    setError(false);
    handleAddExperience(newExp, userId, onExpAdded, onClose,setNewExp);

  
  };

  return (
    <Dialog open={open} handler={onClose}>
      <form onSubmit={handleAddExp} className="p-4">
        <Typography variant="h5" className="mb-2">Add Experience</Typography>
        <select name="title" value={newExp.title} onChange={handleChange} className="border p-2 w-full rounded-md">
          <option value="">Select Job Title</option>
          {jobTitles.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>
        <select name="company" value={newExp.company} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md">
          <option value="">Select Company</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
        <select name="employmentType" value={newExp.employmentType} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md">
          <option value="">Select Employment Type</option>
          {employmentTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        <select name="locationType" value={newExp.locationType} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md">
          <option value="">Select Location Type</option>
          {locationTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        <div className="flex gap-2 mt-2">
          <input type="text" name="startDate" placeholder="Start Date" value={newExp.startDate} onChange={handleChange} className="border p-2 w-1/2 rounded-md" />
          <input type="text" name="endDate" placeholder="End Date" value={newExp.endDate} onChange={handleChange} className="border p-2 w-1/2 rounded-md" />
        </div>
        <textarea name="description" placeholder="Description" value={newExp.description} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md" />
        <select name="location" value={newExp.location} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md">
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
        <input type="text" name="profileHeadline" placeholder="Profile Headline" value={newExp.profileHeadline} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md" />
        <select name="foundJobSource" value={newExp.foundJobSource} onChange={handleChange} className="border p-2 w-full mt-2 rounded-md">
          <option value="">Where did you find this job?</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Company Website">Company Website</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
        <div className="flex justify-end mt-4">
          <Button color="red" onClick={onClose} className="mr-2">Cancel</Button>
          <Button type="submit" color="blue">Save</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddExpModal;
