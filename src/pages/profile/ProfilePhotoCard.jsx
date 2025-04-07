import React, { useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";
import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

const ProfilePhotoCard = ({ userData, setOpenPP }) => {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const updatedUser = { ...userData, profilePicture: reader.result };
      try {
        await axios.patch(`http://localhost:3000/users/${userData.id}`, updatedUser);
        window.location.reload(); // optional: refresh to show change
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = async () => {
    const updatedUser = { ...userData, profilePicture: "/photos/blank-profile-picture-973460_1280.svg" };
    try {
      await axios.patch(`http://localhost:3000/users/${userData.id}`, updatedUser);
      window.location.reload(); // optional: refresh to show change
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <div>
      <Card className="bg-[#293138] text-white p-4">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <Typography variant="h5" className="font-semibold text-white">
              cover Photo
            </Typography>
            <MdCancel className="text-white cursor-pointer" size={30} onClick={() => setOpenPP(false)} />
          </div>

          {/* Profile Photo */}
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-lg mt-4"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full px-8">
            {/* Upload Button */}
            <div className="flex flex-col items-center cursor-pointer" onClick={triggerFileInput}>
              <FaCamera />
              <Typography variant="h6" className="text-white mt-2">
                Add Photo
              </Typography>
            </div>

            {/* Delete Button */}
            <div className="flex flex-col items-center cursor-pointer" onClick={handleRemoveProfilePicture}>
              <FaRegTrashAlt />
              <Typography variant="h6" className="text-white mt-2">
                Delete Photo
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePhotoCard;
