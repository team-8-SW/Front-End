import React, { useState } from "react";
import {
  Card, Typography, Button, Dialog, Input, Select, Option
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/profile"; // Adjust the import path as necessary

const CreateCompanyForm = ({ setCompanyData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    organization_type: "",
    website: "",
    size: "",
    location: "",
    about: "",
  });

  const navigate = useNavigate();
  let companyid = 0;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const payload = {
      ...formData,
      // Send fake URLs to satisfy backend
      logo_url: "https://fake.logo.com/logo.png",
      cover_photo_url: "https://fake.cover.com/cover.jpg",
    };

    try {
      const res = await api.post("/api/company", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Company created successfully!");
      companyid = res.data.company.id;
      localStorage.setItem("companyData", JSON.stringify(res.data));
      if (setCompanyData) setCompanyData(res.data);
      navigate(`/company/${companyid}/dashboard`);
    } catch (error) {
      console.error("Error creating company:", error);
      alert(error.response?.data?.error || error.message || "Failed to create company");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="w-full shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Typography variant="h4" color="blue-gray">
              Create Company Page
            </Typography>

            <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
            <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
            <Input label="Website" name="website" value={formData.website} onChange={handleChange} />

            <Select
              label="Organization Type"
              value={formData.organization_type}
              onChange={(val) => setFormData((prev) => ({ ...prev, organization_type: val }))}
              required
            >
              <Option value="Public company">Public company</Option>
              <Option value="Self-employed">Self-employed</Option>
              <Option value="Government agency">Government agency</Option>
              <Option value="Nonprofit">Nonprofit</Option>
              <Option value="Sole proprietorship">Sole proprietorship</Option>
              <Option value="Privately held">Privately held</Option>
              <Option value="Partnership">Partnership</Option>
            </Select>

            <Select
              label="Company Size"
              value={formData.size}
              onChange={(val) => setFormData((prev) => ({ ...prev, size: val }))}
              required
            >
              <Option value="0-1 employees">0-1 employees</Option>
              <Option value="2-10 employees">2-10 employees</Option>
              <Option value="11-50 employees">11-50 employees</Option>
              <Option value="51-200 employees">51-200 employees</Option>
              <Option value="201-500 employees">201-500 employees</Option>
              <Option value="501-1000 employees">501-1000 employees</Option>
              <Option value="1001-5000 employees">1001-5000 employees</Option>
              <Option value="5001-10000 employees">5001-10,000 employees</Option>
              <Option value="10000+ employees">10,000+ employees</Option>
              
            </Select>

            <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input label="About" name="about" value={formData.about} onChange={handleChange} />

            <div className="flex justify-end gap-4">
              <Button variant="outlined" color="blue" onClick={() => setOpen(true)}>Preview</Button>
              <Button color="blue" type="submit">Create Company</Button>
            </div>
          </form>
        </Card>

        <Card className="w-full shadow-lg p-6">
          <Typography variant="h5" className="mb-4 text-center">Preview Card</Typography>
          <div className="flex flex-col gap-1">
            <img src={"https://fake.logo.com/logo.png"} alt="Logo" className="w-40 h-40 object-contain" />
            <Typography variant="h6">{formData.name || "Company Name"}</Typography>
            <Typography className="text-sm text-gray-500">{formData.industry || "Industry"}</Typography>
            <Typography className="text-sm">Location: {formData.location}</Typography>
            <Typography className="text-sm">Website: {formData.website}</Typography>
            <Typography className="text-sm">Type: {formData.organization_type}</Typography>
            <Typography className="text-sm">Size: {formData.size}</Typography>
            <Typography className="text-sm">About: {formData.about}</Typography>
            <img src={"https://fake.cover.com/cover.jpg"} alt="Cover" className="w-full h-32 object-cover mt-2" />
          </div>
        </Card>
      </div>

      <Dialog open={open} handler={() => setOpen(false)}>
        <div className="p-6">
          <Typography variant="h5">Full Preview</Typography>
          <pre className="text-sm mt-2">{JSON.stringify({
            ...formData,
            logo_url: "https://fake.logo.com/logo.png",
            cover_photo_url: "https://fake.cover.com/cover.jpg"
          }, null, 2)}</pre>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateCompanyForm;
