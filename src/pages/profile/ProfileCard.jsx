import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Dialog,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ContactInfo from "./ContactInfo"; // Import ContactInfo Component
import ProfilePhotoCard from "./ProfilePhotoCard";
import CoverPhotoCard from "./CoverPhotoCard"; // Import CoverPhotoCard Component

const ProfileCard = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false); // State for Contact Info modal
  const [userData, setUserData] = useState(null);
  const [openPP, setOPenPP] = useState(false); // State for Profile Photo modal
  const [openCP, setOPenCP] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, [loggedUser]);

  if (!userData) return <p>Loading...</p>;

  // Handle file upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserData({ ...userData, [e.target.name]: reader.result });
      };
    }
  };

  // Handle text input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Remove profile picture
  const removeProfilePicture = () => {
    setUserData({ ...userData, profilePicture: "" });
  };

  // Remove cover photo
  const removeCoverPhoto = () => {
    setUserData({ ...userData, coverPhoto: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, userData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Card className="relative w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Cover Image */}
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src={userData.coverPhoto || ""}
          alt="cover-image"
          className="w-full h-full object-cover p-0"
          onClick={() => setOPenCP(true)}
        />
      </CardHeader>

      {/* Profile Image */}
      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src={userData.profilePicture || ""}
          size="xxl"
          className="border-4 border-white shadow-lg cursor-pointer"
          onClick={()=> setOPenPP(true)}
        />
      </div>

      {/* User Info */}
      <CardBody className="pt-16">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Typography variant="h3" color="blue-gray" className="font-semibold">
              {userData.fname} {userData.lname}
            </Typography>
            <button onClick={() => setOpen(true)} className="text-gray-600 hover:text-gray-800">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <Typography variant="small" className="text-gray-500">
            {userData.bio}
          </Typography>
          <div className="flex gap-2">
            <Typography variant="small" className="text-gray-500">
              {userData.locationCity}, {userData.locationCountry}
            </Typography>
            {/* Contact Info Button */}
            <button
              onClick={() => setOpenContact(true)}
              className="text-blue-500 cursor-pointer flex items-center gap-1"
            >
              Contact Info <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardBody>

      {/* Buttons */}
      <CardFooter className="flex justify-start gap-3 pb-6">
        <Button color="blue">Open to</Button>
        <Button variant="outlined" color="blue">
          Add Profile Section
        </Button>
      </CardFooter>

      {/* Edit Profile Modal */}
      <Dialog open={open} handler={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <Typography variant="h5" className="mb-2">Edit Profile</Typography>
          <Input type="text" name="fname" value={userData.fname} onChange={handleChange} label="First Name" required />
          <Input type="text" name="lname" value={userData.lname} onChange={handleChange} label="Last Name" required />
          <Input type="text" name="locationCity" value={userData.locationCity} onChange={handleChange} label="City" required />
          <Input type="text" name="locationCountry" value={userData.locationCountry} onChange={handleChange} label="Country" required />
          <Input type="text" name="bio" value={userData.bio} onChange={handleChange} label="Bio" />

          {/* Profile Picture Upload & Remove */}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} />
            <button type="button" onClick={removeProfilePicture} className="bg-red-500 text-white px-2 py-1 rounded">
              <TrashIcon className="w-4 h-4" /> Remove
            </button>
          </div>

          {/* Cover Photo Upload & Remove */}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700">Cover Photo</label>
            <input type="file" name="coverPhoto" accept="image/*" onChange={handleFileChange} />
            <button type="button" onClick={removeCoverPhoto} className="bg-red-500 text-white px-2 py-1 rounded">
              <TrashIcon className="w-4 h-4" /> Remove
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <Button color="red" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
            <Button type="submit" color="blue">Save</Button>
          </div>
        </form>
      </Dialog>

      {/* Contact Info Modal */}
      <Dialog open={openContact} handler={() => setOpenContact(false)}>
        <ContactInfo userData={userData} setOpenContact={setOpenContact} />
      </Dialog>
      <Dialog open={openPP} handler={() => setOPenPP(false)}>
        <ProfilePhotoCard userData={userData} setOpenPP={setOPenPP} />
      </Dialog>
      <Dialog open={openCP} handler={() => setOPenCP(false)}>
        <CoverPhotoCard userData={userData} setOpenCP={setOPenCP} />
      </Dialog>
    </Card>

  );
};

export default ProfileCard;
