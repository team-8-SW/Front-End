import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "./profile";
import { MdVisibility } from "react-icons/md";
import { api } from "./profile";

export const useProfilePicture = (userId, token) => {
  const userData = useUserData(userId, token);
  return userData?.profile?.profilePictureUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
};

export const useUserId = (token) => {
  const userData = useUserData(null, token);
  const userId = userData?.id;
  return userId;
};

export const useUserName = (userId, token) => {
  const userData = useUserData(userId, token);
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
        if (token && !userId) {
          const response = await axios.get(`http://localhost:5000/api/profiles/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
         
        } else if (userId && token) {
          const response = await axios.get(`http://localhost:5000/api/profiles/me/${userId}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          setUser(response.data);
    
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
    
  }, [userId,token]);
  

  return user;
};

export const fetchPosts = async (token) => {
  try {
    const response = await api.get(`/api/posts/me/feed`, {
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
    const response = await api.get(`/api/posts/me`, {
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
    const response = await api.post(`/users?email=${email}`);
    return response.data.message;
  } catch (error) {
    console.error("Error sending signup email:", error);
    throw new Error("Failed to send signup email.");
  }
};

export const checkEmail = async (email, password) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();

        const response = await api.get("/users");
    const users = response.data;

        const existingUser = users.find((user) => user.email === normalizedEmail);

    if (existingUser) {
      throw new Error("Email is already registered.");
     
    }

        const newUser = { email: normalizedEmail, password, skills: [], education: [], experience: [] };
    await api.post("/users", newUser);

    return { success: true, message: "Signup successful! Redirecting to login..." };
  } catch (error) {
    return { success: false, message: error.message || "Signup failed. Please try again." };
  }
};

const likePost = async (postId, token) => {
  try {
    await api.post(
      `/api/posts/me/like`,
      { post_id: postId },
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
    await api.delete(
      `/api/posts/me/unlike`,
      {
        data: { post_id: postId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error unliking the post:", error);
  }
};

export const handleLikePost = async (postId, token, liked, setLiked, setLikesCount, likesCount) => {
  try {
    if (liked) {
      await unlikePost(postId, token);
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      await likePost(postId, token);
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  } catch (error) {
    console.error("Error handling like post:", error);
  }
};

const repostPost = async (postId, token) => {
  try {
    await api.post(
      `/api/posts/me/share`,
      { post_id: postId },
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

export const handlerepostPost = async (postId, token, setrepostsCount, repostsCount) => {
  await repostPost(postId, token);
  setrepostsCount(repostsCount + 1);
};

export const handleAddNewComment = async (postId, newComment, token, setCommentsCount, commentsCount) => {
  try {
    const response=await api.post(
      `/api/posts/me/comment`,
      {
        post_id: postId,
        content: newComment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCommentsCount(commentsCount + 1);
    console.log("Comment added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export const handleLoadMoreComments = (setVisibleComments) => {
  setVisibleComments((prev) => prev + 2);
};

export const updateEmail = async (newEmail, token) => {
  try {
    const response = await api.patch(
      `/api/auth/updateemail`,
      { email: newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error.response || error.message);
    throw error;
  }
};


export const fetchNotifications = async (token) => {
  try {
    const response = await api.get(`/api/notifications/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Network response was not ok");
  }
};

export const markNotificationAsRead = async (notificationId, token) => {
  try {
    await api.patch(
      `/api/notifications/me/${notificationId}/markasread`,
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
    const response = await api.get(`/api/notifications/me/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.unreadCount;
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    throw new Error("Network response was not ok");
  }
};

export const googleLogin = async (idToken) => {
  try {
    const response = await api.post("/api/auth/social/google", {
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
    const response = await api.post(
      `/api/connections/users/${userId}`, 
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
  const { data } = await api.get('/api/users/me/search', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const getConnections = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get('/api/connections/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching connections:', error);
    throw error;
  }
};

export const acceptConnection = async (connectionId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(
      `/api/connections/${connectionId}/accept`,
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
    const response = await api.post(
      `/api/connections/${connectionId}/decline`,
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
  const token = localStorage.getItem("token");
  try {
    const response = await api.delete(`/api/connections/${connectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Remove connection error:', error);
    throw error;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const response = await api.delete(
      `/api/posts/me/delete`,
      {
        data: { post_id: postId },
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
    const response = await api.post(
      `/api/posts/me/postengagement`,
      { post_id: postId },
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




export const fetchPendingConnections = async (token) => {
  try {
    const response = await api.get(`api/connections/pending`, {
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



// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
export const forgotPassword = (data) => {
  return api.post('/api/auth/forgot-password', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const resetPassword = (data) => {
  return api.post('/api/auth/reset-password', {
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

export const blockUser = async (userId, token) => {
  return api.post(
    `/api/users/${userId}/block`,
    {},
    {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const unblockUser = async (userId, token) => {
  return api.post(
    `/api/users/${userId}/unblock`,  
    {}, 
    {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const followUser = async (userId, token) => {
  try {
    const response = await api.post(
      `/api/following/users/${userId}`,
      {},
      { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const unfollowUser = async (userId, token) => {
  try {
    const response = await api.delete(
      `/api/following/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getBlockedUsers = async (token) => {
  return api.get('/api/users/me/blocked', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};


export const getComments = async (post_id, token) => {
  try {
    const response = await api.get(`/api/posts/me/${post_id}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const addMedia= async(media,token,postId)=>{
  const formData=new FormData();
  formData.append("file",media);
  try{
  const response=await api.post(`/api/posts/me/${postId}/media`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  
  console.log("Media added successfully:", response.data);
  return response.data;
} catch (error) {
  console.error("Error adding media:", error);
  throw error;
}
};

export const tagUser = async (token, userId, postId, commentId) => {
  try {
    const payload = postId
      ? { post_id: postId }
      : { comment_id: commentId };

    await api.post(`/api/posts/me/${userId}/taguser`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User tagged successfully");
  } catch (error) {
    console.error("Error tagging user:", error);
  }
};

export const getSavedPosts=async(token) => {
  try{
    const response= await api.get(`/api/posts/me/getallsavedposts`,
    {
      headers:{
        Authorization:`Bearer ${token}` },
      });
    return response.data;
    } catch(error){
      console.error("Error getting saved posts:",error);
    }
};

export const searchPosts = async (params) => {
  try{
    const response = await api.get('/api/posts/search', {
      params,
    });
    console.log("Search response:", response.data.posts); // Debugging line
    return response.data.posts;
  }
  catch (error) {
    console.error("Error searching posts:", error);
    return error;
  }
};

export const getUserName = async (userId,token) => {
  try {
    const response = await api.get(`/api/profiles/me/${userId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    const profile= response.data?.profile;
    if (!profile) {
      console.error("Profile not found for userId:", userId);
      return null;
    }
    return profile.userName;
  
} catch (error) {
  console.error("Error fetching user data:", error);
  return("error");
}
};

export const getProfilePicture = async (userId,token) => {
  try {
    const response = await api.get(`/api/profiles/me/${userId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    const profile = response.data?.profile;
    if (!profile) {
      console.error("Profile not found for userId:", userId);
      return null;
    }
    return (
      profile.profilePictureUrl ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s"
    );
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bHGb_Zk4zWeD4jw9ew8HboAT2zQIUZhYNA&s";
  }
};

export const updatePassword = async (currentPassword, newPassword, token) => {
  try {
    const response = await api.patch(
      `/api/auth/update-password`,
      {
        currentPassword,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};