


import axios from "axios";
import { useState, useEffect } from "react";



 export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Reads from .env
});


   

export const fetchUser = async ( setLoggedUser) => {
  try {
    const storedUserId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:3000/users/${storedUserId}`);
    setLoggedUser(res.data);
    console.log("User data fetched:", res.data);
    return res.data; // ✅ Return the fetched user
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};



export const handleDeleteExp = (experiences,userId,onDelete) => {
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then((res) => {
      const updatedExperience = res.data.experience.filter((exp) => !(exp.title == experiences.title&&exp.company==experiences.company&&exp.employmentType==experiences.employmentType&&exp.startDate==experiences.startDate&&exp.endDate==experiences.endDate&&exp.description==experiences.description&&exp.location==experiences.location&&exp.locationType==experiences.locationType));
      return axios.patch(`http://localhost:3000/users/${userId}`, {
        experience: updatedExperience,
      });
    })
    .then(() => {
      onDelete(experiences); // Update the UI in React
    })
    .catch((err) => console.error("Error deleting experience:", err));
};
export const handleDeleteEdu = async (edu, onDelete) => {
  const token = localStorage.getItem("token");

  if (!edu.id) {
    console.error("Missing education ID.");
    return;
  }

  try {
    await axios.delete(`http://localhost:5000/api/profiles/me/education/${edu.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    onDelete(edu); // update UI
  } catch (err) {
    console.error("Error deleting education:", err);
    alert(err.response?.data?.error || "Failed to delete education");
  }
};



export const handleDeleteSkill = async (skillId, userId, onDelete) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/profiles/me/skills/${skillId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onDelete(skillId); // This filters in the component
  } catch (err) {
    console.error("Error deleting skill:", err);
    alert("Failed to delete skill");
  }
};



export const handleAddSkill = (newSkill,userId,onSkillAdded) => {
}
export const handleAddEdu = (education, userId, onSave,onClose) => {
  axios
  .get(`http://localhost:3000/users/${userId}`)
  .then((response) => {
    const updatedEducation = [...response.data.education, education];
    return axios.patch(`http://localhost:3000/users/${userId}`, { education: updatedEducation });
  })
  .then(() => {
    onSave(education);
    onClose();
  }) 
  .catch((error) => {
    console.error("Error updating education:", error);
  });}


  

  export const handleAddExperience = async (newExp, onExpAdded, onClose, setNewExp) => {
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.post("http://localhost:5000/api/profiles/me/experience", newExp, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      onExpAdded(res.data.experience);
      setNewExp({
        title: "", company: "", employmentType: "", locationType: "",
        startDate: "", endDate: "", description: "", location: "",
      });
      onClose();
    } catch (err) {
      console.error("Error adding experience:", err);
      alert(err.response?.data?.error || "Failed to add experience");
    }
  };
  
  export const handleDeleteExperience = async (experienceId, onDelete) => {
    const token = localStorage.getItem("token");
    try {
      // Log the ID to ensure it's being passed correctly
      console.log("Attempting to delete experience with ID:", experienceId);
  
      // Make the DELETE request to the backend
      await axios.delete(`http://localhost:5000/api/profiles/me/experience/${experienceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // After successful deletion, update the UI by calling the onDelete function
      onDelete(experienceId); // Pass the experience ID to remove it from the UI
    } catch (err) {
      console.error("Error deleting experience:", err);
      alert("Failed to delete experience: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  
  
  


export const logout = (navigate) => {
  localStorage.removeItem("token"); // Remove user data
  navigate("/login"); // Redirect to login page
};
