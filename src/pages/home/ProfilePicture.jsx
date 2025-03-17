import React from "react";
import { Avatar } from "@material-tailwind/react";
const ProfilePicture = ({ photo }) => {
  return <Avatar src={photo} alt="profile-picture" />;
};
export default ProfilePicture;
