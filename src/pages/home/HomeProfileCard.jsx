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
      <Card className="w-full max-w-xs mx-auto cursor-pointer p-4 mt-4">
        <CardHeader floated={false} shadow={false} className="relative h-24 ">
          <img
            src={coverPhoto}
            alt="cover-photo"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Avatar
            src={profilePicture}
            alt="profile-picture"
            className="w-20 h-20 rounded-full mx-auto -mt-10 border-4 border-white"
          />
          <Typography variant="h5" className="mt-4">
            {name}
          </Typography>
          <Typography className="text-gray-600">
            {userData?.education?.[0]?.school || "No education data available"}
          </Typography>
          <Typography className="text-gray-600">
            {userData?.location?.city || "No location data available"},{" "}
            {userData?.location?.country || ""}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center">
          {userData?.education?.[0]?.degree || "No degree data available"}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HomeProfileCard;
