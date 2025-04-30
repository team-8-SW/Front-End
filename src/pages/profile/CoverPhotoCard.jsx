import React, { useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";
import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { api } from "../../services/profile"; 

const CoverPhotoCard = ({ userData, setUserData, setOpenCP }) => {
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
      const response = await api.post("/api/profiles/me/cover-photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUserData((prev) => ({
        ...prev,
        coverPhotoUrl: response.data.coverPhotoUrl, // backend should return the new URL
      }));
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    }
  };

  const handleRemoveCoverPhoto = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.delete("/api/profiles/me/cover-photo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData((prev) => ({
        ...prev,
        coverPhotoUrl: null,
      }));
    } catch (error) {
      console.error("Error removing cover photo:", error);
    }
  };

  return (
    <div>
      <Card className="bg-[#293138] text-white p-4">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <Typography variant="h5" className="font-semibold text-white">
              Cover Photo
            </Typography>
            <MdCancel className="text-white cursor-pointer" size={30} onClick={() => setOpenCP(false)} />
          </div>

          {/* Current Cover Photo */}
          <img
            src={userData.coverPhotoUrl || "/photos/55k1z8997gh8dwtihm11aajyq.svg"}
            alt="Cover"
            className="w-[80%] h-[200px] mt-4 object-cover rounded"
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
            <div className="flex flex-col items-center cursor-pointer" onClick={triggerFileInput}>
              <FaCamera />
              <Typography variant="h6" className="text-white mt-2">
                Add Photo
              </Typography>
            </div>

            <div className="flex flex-col items-center cursor-pointer" onClick={handleRemoveCoverPhoto}>
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


export default CoverPhotoCard;
