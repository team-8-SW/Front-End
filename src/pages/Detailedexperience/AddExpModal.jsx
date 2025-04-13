import React, { useState } from "react";
import { Dialog, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const jobTitles = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer"];
const companies = ["Google", "Microsoft", "Amazon", "Facebook"];
const locations = ["New York, USA", "London, UK", "Berlin, Germany", "Tokyo, Japan"];
const defaultSkills = ["JavaScript", "React", "Node.js", "C++", "Java"];

const AddExpModal = ({ open, onClose, onExpAdded }) => {
  const [expData, setExpData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    currentJob: false,
    description: "",
    location: "",
    skills: []
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setExpData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expData.companyName || !expData.position || !expData.startDate || expData.currentJob === null) {
      alert("Company name, position, start date, and current job are required");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profiles/me/experience",
        {
          companyName: expData.companyName,
          position: expData.position,
          startDate: new Date(expData.startDate).toISOString().split("T")[0],
          endDate: expData.endDate ? new Date(expData.endDate).toISOString().split("T")[0] : null,
          currentJob: expData.currentJob,
          description: expData.description,
          location: expData.location,
          skills: expData.skills
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data?.experience) {
        onExpAdded(response.data.experience);
        onClose();
      } else {
        alert("Unexpected server response.");
      }
    } catch (err) {
      console.error("Error adding experience:", err);
      alert(err.response?.data?.error || "Internal server error");
    }
  };

  const handleSkillToggle = (skill) => {
    setExpData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <Dialog open={open} handler={onClose}>
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <Typography variant="h5">Add Experience</Typography>

        <select
          name="position"
          value={expData.position}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        >
          <option value="">Select Job Title</option>
          {jobTitles.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <select
          name="companyName"
          value={expData.companyName}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        >
          <option value="">Select Company</option>
          {companies.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={expData.startDate}
            onChange={handleChange}
            className="border p-2 rounded-md w-1/2"
          />
          <input
            type="date"
            name="endDate"
            value={expData.endDate}
            onChange={handleChange}
            className="border p-2 rounded-md w-1/2"
            disabled={expData.currentJob}
          />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="currentJob"
            checked={expData.currentJob}
            onChange={handleChange}
          />
          <span>Currently working here</span>
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={expData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        />

        <select
          name="location"
          value={expData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        >
          <option value="">Select Location</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>{loc}</option>
          ))}
        </select>

        <div>
          <Typography variant="small" className="mb-1">
            Skills
          </Typography>
          <div className="flex flex-wrap gap-2">
            {defaultSkills.map((skill) => (
              <label key={skill} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={expData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="text" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="blue">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddExpModal;
