import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Radio, Button } from "@material-tailwind/react";
import { api } from "../../services/profile";

const ThirdSide = ({ loggedUser }) => {
  const [visibility, setVisibility] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      // Assuming loggedUser contains current visibility
      setVisibility(loggedUser.visibility || "public");
    }
  }, [loggedUser]);

  const handlePrivacyChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await api.put(
        "/api/profiles/me/visibility",
        { visibility },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Visibility updated successfully!");
    } catch (error) {
      console.error("Error updating visibility:", error);
      alert("Failed to update visibility.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="p-4">
        <Typography variant="h6" color="blue-gray">
          Profile Visibility
        </Typography>

        <div className="flex flex-col gap-2 mt-4">
          <Radio
            name="privacy"
            label="Public"
            value="public"
            checked={visibility === "public"}
            onChange={handlePrivacyChange}
          />
          <Radio
            name="privacy"
            label="Private"
            value="private"
            checked={visibility === "private"}
            onChange={handlePrivacyChange}
          />
          <Radio
            name="privacy"
            label="Connections Only"
            value="connections"
            checked={visibility === "connections"}
            onChange={handlePrivacyChange}
          />
        </div>

        <Button
          className="mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
};

export default ThirdSide;
