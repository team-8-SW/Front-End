import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Avatar,
  Dialog,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateCompanyForm = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState({
    logo: "",
    name: "",
    website: "",
    industry: "",
    size: "",
    type: "",
    email: "",
  });
  const navigate = useNavigate();
   useEffect(() => {
      if (loggedUser) {
        setCompanyData(loggedUser.company|| {});
      }
    }, [loggedUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCompanyData({ ...companyData, logo: reader.result });
      };
    }
  };

  const handleChange = (e) => {
    
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        company: companyData,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <Card className="w-full shadow-lg p-6">

        {/* Left Side - Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Typography variant="h4" color="blue-gray">
            Create Company Page
          </Typography>

          <Input label="Company Name" name="name" value={companyData.name} onChange={handleChange} required />
          <Input label="Website" name="website" value={companyData.website} onChange={handleChange} />
          <Input label="Industry" name="industry" value={companyData.industry} onChange={handleChange} required />

          <Select
  label="Company Size"
  value={companyData.size}
  onChange={(val) => setCompanyData((prev) => ({ ...prev, size: val }))} // ✅ Fixed
>
  <Option value="1-10 employees">1-10 employees</Option>
  <Option value="11-50 employees">11-50 employees</Option>
  <Option value="51-200 employees">51-200 employees</Option>
  <Option value="201-500 employees">201-500 employees</Option>
  <Option value="500+ employees">500+ employees</Option>
</Select>

<Select
  label="Company Type"
  value={companyData.type}
  onChange={(val) => setCompanyData((prev) => ({ ...prev, type: val }))} // ✅ Fixed
>
  <Option value="Public">Public</Option>
  <Option value="Private">Private</Option>
  <Option value="Non-Profit">Non-Profit</Option>
  <Option value="Government">Government</Option>
</Select>

          <Input label="Company Email" name="email" value={companyData.email} onChange={handleChange} required />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
            {companyData.logo && (
              <Button
                color="red"
                onClick={() => setCompanyData({ ...companyData, logo: "" })}
                className="flex items-center gap-1"
              >
                <TrashIcon className="w-4 h-4" /> Remove
              </Button>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outlined" color="blue" onClick={() => setOpen(true)}>
              Preview
            </Button>


            <Button color="blue" type="submit" onClick={() => navigate("/company")}>
              
              Create or update
            </Button>

          </div>
        </form>
      </Card>

        {/* Right Side - Company Card Preview */}
        <Card className="w-full shadow-lg p-6">
          <Typography variant="h5" className="mb-4 text-center">Preview Card</Typography>
          <div className="flex flex-col ">
          {companyData.logo && <img src={companyData.logo} alt="Company Logo Preview" className="w-40 mt-4" />}
            <Typography variant="h6">{companyData.name || "Company Name"}</Typography>
            <Typography className="text-sm text-gray-500">{companyData.industry || "Industry"}</Typography>
            <div className="mt-4 text-sm space-y-1 ">
              <Typography><strong>Website:</strong> {companyData.website || "N/A"}</Typography>
              <Typography><strong>Size:</strong> {companyData.size || "N/A"}</Typography>
              <Typography><strong>Type:</strong> {companyData.type || "N/A"}</Typography>
              <Typography><strong>Email:</strong> {companyData.email || "N/A"}</Typography>
              <Button className="rounded-full bg-blue-700 p-3">+ follow</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal Dialog for Full Preview */}
      <Dialog open={open} handler={() => setOpen(false)}>
        <div className="p-6">
          <Typography variant="h5">Company Info Preview</Typography>
          <div className="mt-4 space-y-2">
          {companyData.logo && <img src={companyData.logo} alt="Company Logo Preview" className="w-40 mt-4" />}
            <Typography><strong>Name:</strong> {companyData.name}</Typography>
            <Typography><strong>Website:</strong> {companyData.website}</Typography>
            <Typography><strong>Industry:</strong> {companyData.industry}</Typography>
            <Typography><strong>Size:</strong> {companyData.size}</Typography>
            <Typography><strong>Type:</strong> {companyData.type}</Typography>
            <Typography><strong>Email:</strong> {companyData.email}</Typography>
           
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateCompanyForm;