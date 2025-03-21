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

  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    setProfilePicture(response.data.profilePicture);
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

  if (profilePicture === "") {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
  } else return profilePicture;
};

const fetchUserId = async (setUserId) => {
  try {
    const response = await axios.get("http://localhost:3000/currentUser");
    setUserId(response.data.id);
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

const fetchCoverPhoto = async (userId, setCoverPhoto) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    setCoverPhoto(response.data.coverPhoto);
  } catch (error) {
    console.error("Error fetching cover photo:", error);
  }
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
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    const fullName = `${response.data.fname} ${response.data.lname}`;
    setName(fullName);
  } catch (error) {
    console.error("Error fetching name:", error);
  }
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
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    setUser(response.data);
    console.log("User data fetched:", response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
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

export const fetchPosts = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/posts?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Network response was not ok");
  }
};


export const resetPassword = async (email) => {
  try {
    // Check if email exists in the database
    const response = await axios.get(`http://localhost:3000/users?email=${email}`);

    if (response.data.length === 0) {
      throw new Error("Email not found.");
    }

    const user = response.data[0]; // Get user data

    // Generate a fake reset token (In a real app, this would be securely created)
    const resetToken = Math.random().toString(36).substring(2, 15); 

    // Save token in the database (mocking this in JSON server)
    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      resetToken
    });

    // Create the reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Simulate sending an email (Replace this with an actual email service)
    console.log(`Reset link sent: ${resetLink}`);

    return "Password reset link sent! Check your email.";
  } catch (error) {
    return error.response?.data?.error || error.message || "Something went wrong. Please try again.";
  }
};

export const sendSignupEmail = async (email) => {
  try {
    const response = await axios.post(`http://localhost:3000/users?email=${email}`);
    return response.data.message;
  } catch (error) {
    console.error("Error sending signup email:", error);
    throw new Error("Failed to send signup email.");
  }
};

export const checkEmail = async (email, password) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Fetch all users and manually filter
    const response = await axios.get("http://localhost:3000/users");
    const users = response.data;

    // Check if any user has the same email
    const existingUser = users.find(user => user.email === normalizedEmail);

    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    // Proceed with user registration
    const newUser = { email: normalizedEmail, password };
    await axios.post("http://localhost:3000/users", newUser);

    return { success: true, message: "Signup successful! Redirecting to login..." };
  } catch (error) {
    return { success: false, message: error.message || "Signup failed. Please try again." };
  }
};

export const signIn = async (email, password) => {
  try {
    console.log("Logging in with:", email, password);

    // Fetch all users from db.json
    const response = await axios.get("http://localhost:3000/users");

    // Filter users by email
    const users = response.data.filter((user) => user.email === email);

    if (users.length === 0) {
      return "Incorrect email or password";
    }

    // Use the first matched user
    const user = users[0];

    console.log("Found user:", user);

    // Check if the password matches
    if (user.password !== password) {
      return "Incorrect email or password";
    }

    // Return user data and a dummy token
    return { token: "dummy-token", user };
  } catch (error) {
    console.error("API Error:", error);
    return "Login failed. Please try again.";
  }
};
export const likePost = async (postId, userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    const post = response.data;
    post.likes.push(userId);
    await axios.put(`http://localhost:3000/posts/${postId}`, post);
  } catch (error) {
    console.error("Error liking the post:", error);
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}`);
    const post = response.data;
    post.likes = post.likes.filter((id) => id !== userId);
    await axios.put(`http://localhost:3000/posts/${postId}`, post);
  } catch (error) {
    console.error("Error unliking the post:", error);
  }
};

const fetchComments = async (postId, setComments) => {
  try {
    const response = await axios.get(`http://localhost:3000/comments?postId=${postId}`);
    setComments(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (postId) {
      fetchComments(postId, setComments);
    }
  }, [postId]);

  return comments;
};


export const handleLikePost = async (postId, userId, liked, setLiked, setLikesCount) => {
  if (liked) {
    await unlikePost(postId, userId);
    setLiked(false);
    setLikesCount((prev) => prev - 1);
  } else {
    await likePost(postId, userId);
    setLiked(true);
    setLikesCount((prev) => prev + 1);
  }
};


export const handleAddNewComment = (newComment, userId,authorName, comments, setComments, setNewComment) => {
  
  if (newComment.trim()) {
    const newCommentObj = {
      id: comments.length + 1,
      authorId: userId,
      authorName: authorName,
      content: newComment,
    };
    setComments([newCommentObj, ...comments]);
    setNewComment(""); 
  }
};


export const handleLoadMoreComments = (setVisibleComments) => {
  setVisibleComments((prev) => prev + 2);
};
