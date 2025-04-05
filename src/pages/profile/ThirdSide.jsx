import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Radio, Button } from "@material-tailwind/react";

const ThirdSide = ({ loggedUser }) => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false); // For modal or confirmation if needed

  useEffect(() => {
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, [loggedUser]);

  if (!userData) return <p>Loading...</p>;

  const handlePrivacyChange = (e) => {
    setUserData({ ...userData, privacy: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, userData);
      setOpen(false);
      alert("Privacy settings updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Card className="p-4">
        <Typography variant="h6" color="blue-gray">
          Privacy Settings:
        </Typography>

        <div className="flex flex-col gap-2 mt-4">
          <Radio
            name="privacy"
            label="Public"
            value="public"
            checked={userData.privacy === "public"}
            onChange={handlePrivacyChange}
          />
          <Radio
            name="privacy"
            label="Private"
            value="private"
            checked={userData.privacy === "private"}
            onChange={handlePrivacyChange}
          />
        </div>

        <Button className="mt-4" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Card>
    </div>
  );
};

export default ThirdSide;
