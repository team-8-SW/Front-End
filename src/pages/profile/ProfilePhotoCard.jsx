import React, { useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";
import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import { api } from "../../services/profile"; // ✅ Make sure to import from your axios instance

const ProfilePhotoCard = ({ userData, setUserData, setOpenPP }) => {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/api/profiles/me/profile-picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Update the profile picture without reloading
      setUserData((prev) => ({
        ...prev,
        profilePictureUrl: response.data.profilePictureUrl,
      }));
      setOpenPP(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleRemoveProfilePicture = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.delete("/api/profiles/me/profile-picture", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData((prev) => ({
        ...prev,
        profilePictureUrl: null,
      }));
      setOpenPP(false);
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <div>
      <Card className="bg-[#293138] text-white p-4">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex justify-between items-center w-full">
            <Typography variant="h5">Profile Photo</Typography>
            <MdCancel size={30} className="cursor-pointer" onClick={() => setOpenPP(false)} />
          </div>

          <img
            src={userData.profilePictureUrl || "/photos/default-profile.svg"}
            alt="Profile"
            className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-lg mt-4 object-cover"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex justify-between items-center w-full px-8">
            <div className="flex flex-col items-center cursor-pointer" onClick={triggerFileInput}>
              <FaCamera />
              <Typography variant="h6" className="mt-2">Add Photo</Typography>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={handleRemoveProfilePicture}>
              <FaRegTrashAlt />
              <Typography variant="h6" className="mt-2">Delete Photo</Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePhotoCard;
