import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ContactInfo = ({ userData, setOpenContact }) => {
  const [contact, setContact] = useState({
    email: userData?.email || "",
    phone: userData?.phone || "",
    phoneType: userData?.phoneType || "Mobile",
    address: userData?.address || "",
    birthdayMonth: userData?.birthdayMonth || "Month",
    birthdayDay: userData?.birthdayDay || "Day",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Contact Info:", contact);
    setOpenContact(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      {/* Header */}
      <Typography variant="h5" className="font-semibold">
        Edit contact info
      </Typography>

      {/* Email Field */}
      <div>
        <Typography variant="small" className="text-gray-600">
          Email
        </Typography>
        <Link
          // href={`mailto:${contact.email}`}
          to="/EmailManagement"
          className="text-blue-600 flex items-center gap-1 hover:underline"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          {contact.email}
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Phone Number */}
      <div>
        <Typography variant="small" className="text-gray-600">
          Phone number
        </Typography>
        <Input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Phone Type Dropdown */}
      <div>
        <Typography variant="small" className="text-gray-600">
          Phone type
        </Typography>
        <select
          name="phoneType"
          value={contact.phoneType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Mobile</option>
          <option>Home</option>
          <option>Work</option>
        </select>
      </div>

      {/* Address */}
      <div>
        <Typography variant="small" className="text-gray-600">
          Address
        </Typography>
        <textarea
          name="address"
          value={contact.address}
          onChange={handleChange}
          className="w-full p-2 border rounded resize-none"
          maxLength={220}
          rows={3}
          placeholder="Enter your address"
        ></textarea>
        <Typography variant="small" className="text-gray-500 text-right">
          {contact.address.length}/220
        </Typography>
      </div>

      {/* Birthday */}
      <div>
        <Typography variant="small" className="text-gray-600">
          Birthday
        </Typography>
        <div className="flex gap-2">
          <select
            name="birthdayMonth"
            value={contact.birthdayMonth}
            onChange={handleChange}
            className="p-2 border rounded w-1/2"
          >
            <option>Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
          </select>
          <select
            name="birthdayDay"
            value={contact.birthdayDay}
            onChange={handleChange}
            className="p-2 border rounded w-1/2"
          >
            <option>Day</option>
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1}>{day + 1}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button color="red" onClick={() => setOpenContact(false)} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" color="blue">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContactInfo;
