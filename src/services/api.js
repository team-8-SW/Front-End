import { useState, useEffect } from "react";
import axios from "axios";

const fetchProfilePicture = async (userId, setProfilePicture) => {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      setProfilePicture(response.data.profilePicture);
    })
    .catch((error) => {
      console.error("Error fetching profile picture:", error);
    });
};

export const useProfilePicture = (userId) => {
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (userId) {
      fetchProfilePicture(userId, setProfilePicture);
    }
  }, [userId]);
  if (profilePicture === "") {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
  } else return profilePicture;
};

const fetchUserId = async (setUserId) => {
  axios
    .get("http://localhost:3000/currentUser")
    .then((response) => {
      setUserId(response.data.id);
    })
    .catch((error) => {
      console.error("Error fetching user ID:", error);
    });
};

export const useUserId = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    fetchUserId(setUserId);
  }, []);
  return userId;
};

const fetchCoverPhoto = async (userId, setCoverPhoto) => {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      setCoverPhoto(response.data.coverPhoto);
    })
    .catch((error) => {
      console.error("Error fetching cover photo:", error);
    });
};

export const useCoverPhoto = (userId) => {
  const [coverPhoto, setCoverPhoto] = useState("");

  useEffect(() => {
    if (userId) {
      fetchCoverPhoto(userId, setCoverPhoto);
    }
  }, [userId]);
  if (coverPhoto === "") {
    return "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862";
  } else return coverPhoto;
};

const fetchName = async (userId, setName) => {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      const fullName = `${response.data.fname} ${response.data.lname}`;
      setName(fullName);
    })
    .catch((error) => {
      console.error("Error fetching name:", error);
    });
};

export const useName = (userId) => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (userId) {
      fetchName(userId, setName);
    }
  }, [userId]);

  return name;
};

const fetchUserData = async (userId, setUser) => {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
};

export const useUserData = (userId) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (userId) {
      fetchUserData(userId, setUser);
    }
  }, [userId]);

  return user;
};

export const fetchPost = async (postId) => {
  return axios
    .get(`http://localhost:3000/posts/${postId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
      return null;
    });
};
