import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  useUserId,
  useProfilePicture,
  useCoverPhoto,
  useName,
  useUserData,
} from "../../services/api";

const HomeProfileCard = () => {
  const userId = useUserId();
  const profilePicture = useProfilePicture(userId);
  const coverPhoto = useCoverPhoto(userId);
  const name = useName(userId);
  const userData = useUserData(userId);
  
  return (
    <Link to={`/profile`}>
      <Card className="w-full max-w-xs mx-auto cursor-pointer shadow-none border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader floated={false} shadow={false} className="relative h-16">
          <img
            src={coverPhoto}
            alt="cover-photo"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        
        <CardBody className="text-left px-4 pb-2">
          <Avatar
            src={profilePicture}
            alt="profile-picture"
            className="w-20 h-20 rounded-full mx-auto -mt-10 border-4 border-white"
          />
          <Typography variant="h5" className="text-black mt-4 font-bold">
            {name}
          </Typography>
          <Typography className="text-black mt-2">
            {userData?.bio || " "}
          </Typography>
          <Typography className="text-gray-600 text-sm">
            {userData?.location?.city || " "},{" "}
            {userData?.location?.country || ""}
          </Typography>
        
          <Typography className="text-black text-sm font-small">
            {userData?.education?.[0]?.school||" "}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
};

export default HomeProfileCard;