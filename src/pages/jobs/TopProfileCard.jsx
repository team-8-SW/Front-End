// components/TopProfileCard.jsx
import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@material-tailwind/react";
import axios from "axios";

const TopProfileCard = () => {
  const [profile, setProfile] = useState(null);
    const [education, setEducation] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profiles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEducation(res.data.education[0]);
        console.log("Education:", res.data.education[0]);
        setProfile(res.data.profile);
        console.log("Profile:", res.data.profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-white p-4 rounded-md shadow text-center">
      <div className="flex justify-center mb-3">
        <Avatar src={profile.profilePictureUrl || "/default-avatar.png"} size="xl" />
      </div>
      <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>
      <Typography variant="small" className="text-gray-700">{profile.bio}</Typography>
      <Typography variant="small" className="text-gray-500">{profile.location}</Typography>
      <Typography variant="small" className="text-gray-700">{education.universityName}</Typography>
    </div>
  );
};

export default TopProfileCard;
