import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, CardFooter, Typography, Button, Avatar, Dialog, Input
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ContactInfo from "./ContactInfo";
import ProfilePhotoCard from "./ProfilePhotoCard";
import CoverPhotoCard from "./CoverPhotoCard";

const ProfileCard = ({ loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openPP, setOpenPP] = useState(false);
  const [openCP, setOpenCP] = useState(false);
  const [pp,setPP] = useState(null);

  useEffect(() => {
    if (!loggedUser) return;
  
    console.log("User data set:", loggedUser);
    setUserData({
      id: loggedUser.id || "",
      firstName: loggedUser.profile.firstName || "",
      lastName: loggedUser.profile.lastName || "",
      location: loggedUser.profile.location || "",
      bio: loggedUser.profile.bio || "",
      profilePictureUrl: loggedUser.profile.profilePictureUrl || "",
      coverPhotoUrl: loggedUser.profile.coverPhotoUrl || "",
      email: loggedUser.profile.email || "",
      phone: loggedUser.profile.phone || "",
      address: loggedUser.profile.address || "",
      birthdayMonth: loggedUser.profile.birthdayMonth || "",
      birthdayDay: loggedUser.profile.birthdayDay || "",
    });


  }, [loggedUser]);





  
  








  if (!loggedUser || !userData) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/api/profiles/me",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          location: userData.location,
          bio: userData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Card className="relative w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader floated={false} shadow={false} className="relative h-40">
        <img
          src={userData.coverPhotoUrl || "/photos/55k1z8997gh8dwtihm11aajyq.svg"}
          alt="cover"
          className="w-full h-full object-cover"
          onClick={() => setOpenCP(true)}
        />
      </CardHeader>

      <div className="absolute top-28 left-[20%] transform -translate-x-1/2">
        <Avatar
          src={userData.profilePictureUrl || ""}
          size="xxl"
          className="border-4 border-white shadow-lg cursor-pointer"
          onClick={() => setOpenPP(true)}
        />
      </div>

      <CardBody className="pt-16">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Typography variant="h3" color="blue-gray" className="font-semibold">
              {userData.firstName} {userData.lastName}
            </Typography>
            <button onClick={() => setOpen(true)} className="text-gray-600 hover:text-gray-800">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <Typography variant="small" className="text-gray-500">{userData.bio}</Typography>
          <div className="flex items-center gap-2 mt-2">
          <Typography variant="small" className="text-gray-500">{userData.location}</Typography>
          <button onClick={() => setOpenContact(true)} className="text-blue-500 text-sm flex items-center gap-1">
            Contact Info <PencilIcon className="w-4 h-4" />
          </button>
          </div>
          <div className="flex justify-start gap-3 pb-6 mt-5">
          <Button color="blue">Open to</Button>
          <Button variant="outlined" color="blue">Add Profile Section</Button>
          </div>
        
        </div>
      </CardBody>

      

      <Dialog open={open} handler={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <Typography variant="h5" className="mb-2">Edit Profile</Typography>
          <Input name="firstName" value={userData.firstName} onChange={handleChange} label="First Name" required />
          <Input name="lastName" value={userData.lastName} onChange={handleChange} label="Last Name" required />
          <Input name="location" value={userData.location} onChange={handleChange} label="Location" required />
          <Input name="bio" value={userData.bio} onChange={handleChange} label="Bio" />
          <div className="flex justify-end mt-4">
            <Button color="red" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
            <Button type="submit" color="blue">Save</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={openContact} handler={() => setOpenContact(false)}>
        <ContactInfo userData={userData} setOpenContact={setOpenContact} />
      </Dialog>
      <Dialog open={openPP} handler={() => setOpenPP(false)}>
        <ProfilePhotoCard userData={userData} setOpenPP={setOpenPP} />
      </Dialog>
      <Dialog open={openCP} handler={() => setOpenCP(false)}>
        <CoverPhotoCard userData={userData} setOpenCP={setOpenCP} />
      </Dialog>
    </Card>
  );
};

export default ProfileCard;