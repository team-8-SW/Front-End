import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";

const ViewProfilePhotoCard = ({ profilePictureUrl, setOpen }) => {
  return (
    <div>
      <Card className="bg-[#293138] text-white p-4">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex justify-between items-center w-full">
            <Typography variant="h5">Profile Photo</Typography>
            <MdCancel size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          <img
            src={profilePictureUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-[250px] h-[250px] rounded-full border-4 border-white shadow-lg mb-4"
          />
        </div>
      </Card>
    </div>
  );
};

export default ViewProfilePhotoCard;
