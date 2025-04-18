import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "./profile";
import { MdVisibility } from "react-icons/md";

export const useProfilePicture = (token) => {
  const userData=useUserData(token);
  const profilePicture=userData?.profilePicture;
  if (profilePicture === "") {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
  } else return profilePicture;
};

export const fetchProfilePicture = async (userId,token) => {
  
  const userData=await fetchUserData(userId,token);
  const profilePicture = userData?.profilePicture;
  if (profilePicture === "") {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
  } else return profilePicture;
};

const fetchUserId = async (setUserId) => {
  try {
    const response = await axios.get("http://localhost:5000/currentUser");
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


export const useCoverPhoto = (userId,token) => {
  const userData=useUserData(userId,token);
  const coverPhoto=userData?.coverPhoto;
  if (coverPhoto === "") {
    return "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862";
  } else return coverPhoto;
};



export const useName = (userId,token) => {
  const userData=useUserData(userId,token);
  const name=`${userData?.fname} ${userData?.lname}`;
  return name;
};

const fetchOtherUserData = async (userId, setUser) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/profiles/me/${userId}`);
    setUser(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
const fetchUserData = async (userId, setUser,token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/profiles/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const useUserData = (userId,token) => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (token) {
      fetchUserData(userId, setUser, token);
    } else if (userId) {
      fetchOtherUserData(userId, setUser);
    }
  }, [userId, token]);

  return user;
};

export const fetchPosts = async (token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/posts/me/feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Network response was not ok");
  }
};
export const fetchMyPosts = async (token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/posts/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Network response was not ok");
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.get(`http://localhost:5000/users?email=${email}`);
    
    if (response.data.length === 0) {
      throw new Error("Email not found.");
    }

    return "Password reset link sent!";
  } catch (error) {
    return error.response?.data?.error || error.message || "Something went wrong. Please try again.";
  }
};

export const sendSignupEmail = async (email) => {
  try {
    const response = await axios.post(`http://localhost:5000/users?email=${email}`);
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
    const response = await axios.get("http://localhost:5000/users");
    const users = response.data;

    // Check if any user has the same email
    const existingUser = users.find(user => user.email === normalizedEmail);

    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    // Proceed with user registration
    const newUser = { email: normalizedEmail, password ,skills:[],education:[],experience:[]};
    await axios.post("http://localhost:5000/users", newUser);

    return { success: true, message: "Signup successful! Redirecting to login..." };
  } catch (error) {
    return { success: false, message: error.message || "Signup failed. Please try again." };
  }
};

export const signIn = async (email, password,setLoggedUser) => {
  try {
    console.log("Logging in with:", email, password);

    // Fetch all users from db.json
    const response = await axios.get("http://localhost:5000/users");

    // Filter users by email
    const users = response.data.filter((user) => user.email === email);

    if (users.length === 0) {
      return "Incorrect email or password";
    }

    // Use the first matched user
    const user = users[0];

    console.log("Found user:", user);
    localStorage.setItem("userId", user.id);
    fetchUser(setLoggedUser);
   
    console.log("User ID stored:", localStorage.getItem("userId"));

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
const likePost = async (postId, token) => {
  try {
    await axios.post(`http://localhost:5000/api/posts/me/like`, postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error liking the post:", error);
  }
};

const unlikePost = async (postId, token) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/me/unlike`,postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error unliking the post:", error);
  }
};


export const handleLikePost = async (postId, token, liked, setLiked, setLikesCount) => {
  if (liked) {
    await unlikePost(postId, token);
    setLiked(false);
    const likes_count=getPostEngagement(postId).like_count;
    setLikesCount(likes_count);
  } else {
    await likePost(postId, token);
    setLiked(true);
    const likes_count=getPostEngagement(postId).like_count;
    setLikesCount(likes_count);
  }
};

const repostPost = async (postId, userId,token) => {
  try {
    await axios.post(`http://localhost:5000/api/posts/me/share`),postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } catch (error) {
    console.error("Error sharing the post:", error);
  }
};


export const handlerepostPost = async (postId,token, setrepostsCount) => {
  
    await repostPost(postId,token);
    const reposts_count=getPostEngagement(postId).repost_count;
    setrepostsCount(reposts_count);
};

export const handleAddNewComment = async (postId,newComment, token) => {
  try {
    // Prepare the payload for the API request
    const payload = {
      post_id: postId,
      content: newComment,
    };

    // Make the POST request to the given endpoint with the token
    await axios.post("http://localhost:5000/api/posts/me/comment", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  catch (error) {
    console.error("Error posting comment:", error);
  }};



export const handleLoadMoreComments = (setVisibleComments) => {
  setVisibleComments((prev) => prev + 2);
};

export const updateEmail = async (newEmail, userId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/auth/${userId}/email`, {
      email: newEmail,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating email:', error.message);
    throw new Error('Error updating email: ' + error.message);
  }
};

export const fetchNotifications = async (token) => {
  try {
    await axios.get(`https://localhost:5000/api/notifications/me`
    , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Network response was not ok");
  }
};

export const markNotificationAsRead = async (notificationId,token) => {
  try {
    await axios.patch(`https://localhost:5000/api/notifications/me/${notificationId}/markasread`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const unReadCount= async (token) => {
  try {
    const response = await axios.get(`https://localhost:5000/api/notifications/me/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.length;
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    throw new Error("Network response was not ok");
  }
};
export const googleLogin = async (idToken) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/social/google", {
      idToken,
    });

    if (response.data.accessToken) {
      return {
        token: response.data.accessToken,
        message: response.data.message,
      };
    } else {
      throw new Error("Login failed. No access token received.");
    }
  } catch (error) {
    console.error("Google Login API Error:", error);
    return {
      error: error.response?.data?.message || error.message || "Login failed. Please try again.",
    };
  }
};


export const handleConnectionRequest = async (userId, token) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/connections/users/${userId}`, 
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const searchUsers = async (token, params) => {
  const { data } = await axios.get('http://localhost:5000/api/users/me/search', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const getConnections = async () => {
  try {
    const response = await apiClient().get('https://localhost:5000/api/connections/');
    return response.data;
  } catch (error) {
    console.error('Error fetching connections:', error);
    throw error;
  }
};
export const acceptConnection = async (userId) => {
  try {
      const response = await axios.post(`https://localhost:5000/api/connections/${userId}/accept`);
      return response.data; 
  } catch (error) {
      throw new Error('Failed to accept connection request: ' + error.message);
  }
};

export const declineConnection = async (userId) => {
  try {
      const response = await axios.delete(`https://localhost:5000/api/connections/${userId}/decline`);
      return response.data; 
  } catch (error) {
      throw new Error('Failed to decline connection request: ' + error.message);
  }
};
export const removeConnection = async (connectionId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/connections/${connectionId}`);
    return response.data; 
  } catch (error) {
    console.error('Remove connection error:', error);
    throw error; 
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/posts/me/deletepost`,postId);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getPostEngagement= async (postId) =>
{
      try{
        const response = await axios.get(`http://localhost:5000/api/posts/me/postengagement`,postId);
        return response.data;
      }
      catch(error){
        console.error("Error fetching post engagement:", error);
        throw error;
      }
}
const API_URL = `http://localhost:5000/api`;

export const fetchPendingConnections = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/connections/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("API Response:", response.data); // Debug

    let connections = [];
    if (Array.isArray(response.data)) {
      connections = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      connections = response.data.data;
    } else if (response.data?.connections && Array.isArray(response.data.connections)) {
      connections = response.data.connections;
    } else if (response.data) {
      connections = [response.data];
    }

    const enrichedConnections = await Promise.all(
      connections.map(async (conn) => {
        try {
          const userId = conn.senderId || conn.userId;
          const userRes = await axios.get(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const user = userRes.data;

          return {
            id: conn.id || conn._id,
            name: user.name || `${user.first_name} ${user.last_name}` || user.user_name || "Unknown User",
            username: user.user_name || "unknown",
            title: user.title || user.headline || "No title",
            avatar: user.profilePicture || user.avatar || "",
            mutualConnections: conn.mutualConnections || 0
          };
        } catch (error) {
          console.error("Error fetching user details:", error);
          return {
            id: conn.id || conn._id,
            name: "Unknown User",
            username: "unknown",
            title: "No title",
            avatar: "",
            mutualConnections: 0
          };
        }
      })
    );

    return enrichedConnections;
  } catch (error) {
    console.error("API Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};
