import { useState, useEffect } from "react";

const fetchProfilePicture = async (userId, setProfilePicture) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setProfilePicture(data.profilePicture);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
  }
};

export const useProfilePicture = (userId) => {
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (userId) {
      fetchProfilePicture(userId, setProfilePicture);
    }
  }, [userId]);

  return profilePicture;
};

const fetchUserId = async (setUserId) => {
  try {
    const response = await fetch("http://localhost:3001/currentUser");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setUserId(data.id);
  } catch (error) {
    console.error("Error fetching user ID:", error);
  }
};

export const useUserId = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    fetchUserId(setUserId);
  }, []);
  return userId;
};
