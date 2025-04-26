import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";

const ApplyForm = ({ open, handleClose, jobId }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    country: "",
    address: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const token = localStorage.getItem("token");

  // Fetch profile data to pre-fill form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profiles/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data?.profile;
        if (profile) {
          setForm((prev) => ({
            ...prev,
            first_name: profile.firstName || "",
            last_name: profile.lastName || "",
            email: profile.email || "",
            country: profile.location?.split(",")[0]?.trim() || "",
            address: profile.location?.split(",")[1]?.trim() || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (open) fetchProfile(); // fetch only when dialog opens
  }, [open, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/apply`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      handleClose();
    } catch (err) {
      console.error("Apply error:", err);
      alert("Failed to apply. Try again.");
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Apply to This Job</DialogHeader>
      <DialogBody className="grid gap-4">
        <Input label="First Name" name="first_name" value={form.first_name} onChange={handleChange} />
        <Input label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} />
        <Input label="Phone Number" name="phone_number" value={form.phone_number} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Country" name="country" value={form.country} onChange={handleChange} />
        <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        <Input label="Resume URL" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} />
        <Textarea label="Cover Letter" name="coverLetter" value={form.coverLetter} onChange={handleChange} />
      </DialogBody>
      <DialogFooter>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button color="blue" onClick={handleSubmit}>Submit</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplyForm;
