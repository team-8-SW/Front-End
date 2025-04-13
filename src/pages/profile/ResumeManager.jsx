import React, { useState, useEffect } from "react";
import axios from "axios";

const ResumeManager = ({ userId, onResumesUpdated }) => {
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    axios.get("http://localhost:5000/api/profiles/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const url = response.data.profile?.resumeUrl;
        setResumeUrl(url || null);
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
      });
  }, []);
  

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/profiles/me/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert("Resume uploaded successfully.");
      if (onResumesUpdated) onResumesUpdated(res.data.resumeUrl); // optional
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Failed to upload resume.");
    }
  };
  

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.delete("http://localhost:5000/api/profiles/me/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
     
      window.location.reload(); // Refresh the page to reflect changes
      if (onResumesUpdated) onResumesUpdated(null); // optional
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume.");
    }
  };
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Manage Resume</h2>

      {/* Upload Resume */}
      <input type="file" onChange={handleUpload} className="mb-3" />

      {/* Display current resume */}
      {resumeUrl ? (
        <div className="flex justify-between items-center p-2 border rounded mb-2">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View Resume
          </a>
          <button onClick={handleDelete} className="text-red-500 ml-2">❌ Delete</button>
        </div>
      ) : (
        <p className="text-gray-500">No resume uploaded</p>
      )}
    </div>
  );
};

export default ResumeManager;
