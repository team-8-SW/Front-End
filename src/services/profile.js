


import axios from "axios";
import { useState, useEffect } from "react";




export const fetchUserId = async () => {
  try {
    const response = await axios.get("http://localhost:3000/currentUser");
    console.log("User fetched:", response.data);
    
    if (response.data.length > 0) {
      return response.data[0].id; // ✅ Return the first user's ID
    } else {
      console.error("No user found in currentUser");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

   

  export const fetchUser = async (userId, setLoggedUser) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
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
export const handleDeleteEdu = (edu,userId,onDelete) => {
  axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        const updatedEducation = res.data.education.filter((e) => !(e.school === edu.school && e.degree === edu.degree));
        return axios.patch(`http://localhost:3000/users/${userId}`, { education: updatedEducation });
      })
      .then(() => {
        onDelete(edu);
      })
      .catch((error) => {
        console.error("Error deleting education:", error);
      });
  }
export const handleDeleteSkill = (skill,userId,onDelete) => {
  axios
  .get(`http://localhost:3000/users/${userId}`)
  .then((res) => {
    const updatedSkills = res.data.skills.filter((s) => s !== skill);

    return axios.patch(`http://localhost:3000/users/${userId}`, {
      skills: updatedSkills, // Update only the skills array
    });
  })
  .then(() => {
    onDelete(skill); // Update the UI in React
  })
  .catch((err) => console.error("Error deleting skill:", err));
}

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
export const handleAddExperience = (newExp, userId, onExpAdded,onClose,setNewExp) => {
  axios
  .get(`http://localhost:3000/users/${userId}`)
  .then((response) => {
    const updatedExp = [...(response.data.experience || []), newExp];
    return axios.patch(`http://localhost:3000/users/${userId}`, {
      experience: updatedExp,
    });
  })
  .then(() => {
    onExpAdded(newExp);
    setNewExp({
      title: "",
      company: "",
      employmentType: "",
      locationType: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
      profileHeadline: "",
      foundJobSource: ""
    });
    onClose();
  })
  .catch((error) => console.error("Error adding experience:", error));
}
export const handleAddSkills = (newSkill,userId,onSkillAdded, setNewSkill,onClose) => {
  axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        const n=[...response.data.skills]
        
        const updatedSkills = [...n, newSkill];

        return axios.patch(`http://localhost:3000/users/${userId}`, {
          skills: updatedSkills
        });
      })
      .then(response => {
        console.log("Skill added successfully!", response.data);
        onSkillAdded(newSkill); // Update parent component
        setNewSkill(""); // Clear input
        onClose(); // Close modal
      })
      .catch(error => console.error("Error adding skill:", error));
}


