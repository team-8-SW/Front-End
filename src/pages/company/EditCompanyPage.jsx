import React, { useEffect, useRef, useState } from "react";
import {
  Card, Typography, Button, Dialog, Input, Select, Option
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { api } from "../../services/profile"; // Adjust the import path as necessary

const EditCompanyForm = ({ setCompanyData }) => {
  const [open, setOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    organization_type: "",
    website: "",
    size: "",
    location: "",
    about: "",
    logo_url: "",
    cover_photo_url: "",
  });

  const { companyid } = useParams();
  const navigate = useNavigate();

  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/company/${companyid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
        setLogoPreview(res.data.logo_url);
        setCoverPreview(res.data.cover_photo_url);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      }
    };

    fetchCompany();
  }, [companyid]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("file", file);
    setLogoPreview(URL.createObjectURL(file));

    try {
      const res = await api.post(
        `/api/company/logo/${companyid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData((prev) => ({
        ...prev,
        logo_url: res.data.LogoPhotoUrl,
      }));
    } catch (err) {
      console.error("Error uploading logo:", err);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("file", file);
    setCoverPreview(URL.createObjectURL(file));

    try {
      const res = await api.post(
        `/api/company/cover/${companyid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData((prev) => ({
        ...prev,
        cover_photo_url: res.data.coverPhotoUrl,
      }));
    } catch (err) {
      console.error("Error uploading cover photo:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await api.put(`/api/company/${companyid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("companyData", JSON.stringify(res.data));
      if (setCompanyData) setCompanyData(res.data);
      navigate(`/company/${companyid}`);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="w-full shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Typography variant="h4" color="blue-gray">
              Edit Company
            </Typography>

            <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
            <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
            <Input label="Website" name="website" value={formData.website} onChange={handleChange} />

            <Select label="Organization Type" value={formData.organization_type} onChange={(val) => setFormData((prev) => ({ ...prev, organization_type: val }))} required>
              <Option value="Public company">Public company</Option>
              <Option value="Self-employed">Self-employed</Option>
              <Option value="Government agency">Government agency</Option>
              <Option value="Nonprofit">Nonprofit</Option>
              <Option value="Sole proprietorship">Sole proprietorship</Option>
              <Option value="Privately held">Privately held</Option>
              <Option value="Partnership">Partnership</Option>
            </Select>

            <Select label="Company Size" value={formData.size} onChange={(val) => setFormData((prev) => ({ ...prev, size: val }))} required>
              <Option value="1-10 employees">1-10 employees</Option>
              <Option value="11-50 employees">11-50 employees</Option>
              <Option value="51-200 employees">51-200 employees</Option>
              <Option value="201-500 employees">201-500 employees</Option>
              <Option value="500+ employees">500+ employees</Option>
            </Select>

            <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input label="About" name="about" value={formData.about} onChange={handleChange} />

            {/* Logo Upload */}
            <div className="flex gap-2 items-center">
              <Button type="button" onClick={() => logoInputRef.current.click()}><FaCamera /> Upload Logo</Button>
              <input type="file" hidden accept="image/*" ref={logoInputRef} onChange={handleLogoUpload} />
            </div>

            {/* Cover Upload */}
            <div className="flex gap-2 items-center">
              <Button type="button" onClick={() => coverInputRef.current.click()}><FaCamera /> Upload Cover Photo</Button>
              <input type="file" hidden accept="image/*" ref={coverInputRef} onChange={handleCoverUpload} />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outlined" color="blue" onClick={() => setOpen(true)}>Preview</Button>
              <Button color="blue" type="submit">Update Company</Button>
            </div>
          </form>
        </Card>

        <Card className="w-full shadow-lg p-6">
          <Typography variant="h5" className="mb-4 text-center">Preview Card</Typography>
          <div className="flex flex-col gap-1">
            <img src={logoPreview || "default-avatar.png"} alt="Logo" className="w-40 h-40 object-contain" />
            <Typography variant="h6">{formData.name || "Company Name"}</Typography>
            <Typography className="text-sm text-gray-500">{formData.industry || "Industry"}</Typography>
            <Typography className="text-sm">Location: {formData.location}</Typography>
            <Typography className="text-sm">Website: {formData.website}</Typography>
            <Typography className="text-sm">Type: {formData.organization_type}</Typography>
            <Typography className="text-sm">Size: {formData.size}</Typography>
            <Typography className="text-sm">About: {formData.about}</Typography>
            <img src={coverPreview || "default-cover.jpg"} alt="Cover" className="w-full h-32 object-cover mt-2" />
          </div>
        </Card>
      </div>

      <Dialog open={open} handler={() => setOpen(false)}>
        <div className="p-6">
          <Typography variant="h5">Form Preview</Typography>
          <pre className="text-sm mt-2 whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </Dialog>
    </div>
  );
};

export default EditCompanyForm;
