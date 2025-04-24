import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Radio, Button } from "@material-tailwind/react";

const FourthSide = ({ loggedUser }) => {
  const [allowConnectionRequests, setAllowConnectionRequests] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedUser && typeof loggedUser.allowConnectionRequests === 'boolean') {
      setAllowConnectionRequests(loggedUser.allowConnectionRequests);
      console.log("Allow Connection Requests:", loggedUser.allowConnectionRequests);
    }
  }, [loggedUser]);

  const handleRequestChange = (e) => {
    setAllowConnectionRequests(e.target.value );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("newconnection", allowConnectionRequests);6
    try {
      setLoading(true);
      await axios.put(
        "http://localhost:5000/api/profiles/me/allow-connection-requests",
        { allowConnectionRequests },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
    } catch (error) {
      console.error("Error updating connection request setting:", error);
      alert("Failed to update connection request setting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="p-4">
        <Typography variant="h6" color="blue-gray">
          Connection Requests
        </Typography>

        <div className="flex flex-col gap-2 mt-4">
        <Radio
  name="connection"
  label="Allow"
  value="true"
  checked={allowConnectionRequests === true}
  onChange={(e) => setAllowConnectionRequests(e.target.value === "true")}
/>
<Radio
  name="connection"
  label="Disallow"
  value="false"
  checked={allowConnectionRequests === false}
  onChange={(e) => setAllowConnectionRequests(e.target.value === "true")}
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

export default FourthSide;
