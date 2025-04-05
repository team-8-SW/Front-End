import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewResumeManager = ({ userId, onResumesUpdated }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // Fetch user resumes on load
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        setResumes(response.data.resume || []);
      })
      
  }, [userId]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Convert file to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newResume = { name: file.name, data: reader.result };
      const updatedResumes = [...resumes, newResume];

      axios.patch(`http://localhost:3000/users/${userId}`, { resume: updatedResumes })
        .then(() => {
          setResumes(updatedResumes);
          onResumesUpdated(updatedResumes);
        })
        .catch(error => console.error("Error uploading resume:", error));
    };
  };

  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Manage Resumes</h2>

      {/* Upload Resume */}
     
      {/* Display Resumes */}
      <ul className="mt-4">
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <li key={index} className="flex justify-between items-center p-2 border rounded mb-2">
              <a href={resume.data} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {resume.name}
              </a>
              
            </li>
          ))
        ) : (
          <p className="text-gray-500">No resumes uploaded</p>
        )}
      </ul>
    </div>
  );
};

export default ViewResumeManager;
