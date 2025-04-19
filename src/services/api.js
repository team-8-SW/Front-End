import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "./profile";
import { MdVisibility } from "react-icons/md";

export const useProfilePicture = (userId,token) => {
  const userData = useUserData(userId, token);
  return userData?.profile?.profilePictureUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
};


export const useUserId = (token) => {
  const userData=useUserData(null,token);
  const userId=userData?.id;
  return userId;
};

export const useUserName=(userId,token)=>{
  const userData=useUserData(userId,token);
  return userData?.profile?.userName;
};

export const useCoverPhoto = (userId, token) => {
  const userData = useUserData(userId, token);
  return userData?.profile?.coverPhotoUrl || "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png?w=862";
};

export const useName = (userId, token) => {
  const userData = useUserData(userId, token);
  if (!userData) return "";
  return `${userData.profile.firstName} ${userData.profile.lastName}`;
};

export const useUserData = (userId, token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(`http://localhost:5000/api/profiles/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } else if (userId) {
          const response = await axios.get(`http://localhost:5000/api/profiles/me/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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
    await axios.post(
      `http://localhost:5000/api/posts/me/like`,
      {post_id: postId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error liking the post:", error);
  }
};

const unlikePost = async (postId, token) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/posts/me/unlike`,{post_id: postId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error unliking the post:", error);
  }
};


export const handleLikePost = async (postId, token, liked, setLiked, setLikesCount) => {
  try {
    if (liked) {
      await unlikePost(postId, token);
      setLiked(false);
    } else {
      await likePost(postId, token);
      setLiked(true);
    }

    // Fetch updated likes count
    const engagement = await getPostEngagement(postId, token);
    setLikesCount(engagement.like_count);
  } catch (error) {
    console.error("Error handling like post:", error);
  }
};

const repostPost = async (postId, token) => {
  try {
    await axios.post(
      `http://localhost:5000/api/posts/me/share`,
      { post_id:postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error sharing the post:", error);
  }
};


export const handlerepostPost = async (postId,token, setrepostsCount) => {
  
    await repostPost(postId,token);
    const reposts_count=getPostEngagement(postId, token).repost_count;
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
    const response = await axios.get(`http://localhost:5000/api/notifications/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // <-- Now returning the notifications
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Network response was not ok");
  }
};

export const markNotificationAsRead = async (notificationId, token) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/notifications/me/${notificationId}/markasread`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const unReadCount = async (token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/notifications/me/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.unreadCount; // Adjust according to your backend response structure
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
    const response = await apiClient().get('http://localhost:5000/api/connections/');
    return response.data.connections; 
  } catch (error) {
    console.error('Error fetching connections:', error);
    throw error; 
  }
};

export const acceptConnection = async (connectionId) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.post(
      `http://localhost:5000/api/connections/${connectionId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.connectionRequest;
  } catch (error) {
    throw new Error('Failed to accept connection request: ' + error.message);
  }
};

export const declineConnection = async (connectionId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      `http://localhost:5000/api/connections/${connectionId}/decline`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.connectionRequest;
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

export const deletePost = async (postId, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/posts/me/deletepost`,
      {
        post_id:postId // Send post_id in the request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getPostEngagement = async (postId, token) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/me/postengagement`,
      { post_id: postId }, // Send post_id in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post engagement:", error);
    throw error;
  }
};


const API_URL = `http://localhost:5000/api`;

export const fetchPendingConnections = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/connections/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("API Response:", response.data); // Debug

    let connections = [];

    if (Array.isArray(response.data.pendingRequests)) {
      connections = response.data.pendingRequests;
    }
    const enrichedConnections = connections.map((conn) => {
      return {
        id: conn.connection_id,
        name: `${conn.first_name} ${conn.last_name}`,
        username: conn.user_name || conn.first_name.toLowerCase(),
        title: conn.headline || "No title",
        avatar: conn.profile_picture_url || "",
        mutualConnections: 0
      };
    });
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


const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const forgotPassword = (data) => {
  return axios.post('http://localhost:5000/api/auth/forgot-password', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const resetPassword = (data) => {
  return axios.post('http://localhost:5000/api/auth/reset-password', {
    token: data.token,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response from server:', error.request);
    } else {
      console.error('Axios config error:', error.message);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const getMessageRequests = async () => {
  try {
    const response = await api.get('/messages/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching message requests:', error);
    throw error;
  }
};

export const acceptMessageRequest = async (id) => {
  try {
    const response = await api.post(`/messages/requests/${id}/accept`);
    return response.data;
  } catch (error) {
    console.error('Error accepting message request:', error);
    throw error;
  }
};

export const declineMessageRequest = async (id) => {
  try {
    const response = await api.post(`/messages/requests/${id}/decline`);
    return response.data;
  } catch (error) {
    console.error('Error declining message request:', error);
    throw error;
  }
};

export const getComments = async (postId, token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/posts/me/comments`, {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}