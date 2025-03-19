import React, { useState, useEffect } from "react";
import axios from "axios";

const ResumeManager = ({ userId, onResumesUpdated }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // Fetch user resumes on load
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        setResumes(response.data.resume || []);
      })
      .catch(error => console.error("Error fetching resumes:", error));
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

  const handleDelete = (index) => {
    const updatedResumes = resumes.filter((_, i) => i !== index);

    axios.patch(`http://localhost:3000/users/${userId}`, { resume: updatedResumes })
      .then(() => {
        setResumes(updatedResumes);
        onResumesUpdated(updatedResumes);
      })
      .catch(error => console.error("Error deleting resume:", error));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Manage Resumes</h2>

      {/* Upload Resume */}
      <input type="file" onChange={handleUpload} className="mb-3" />

      {/* Display Resumes */}
      <ul className="mt-4">
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <li key={index} className="flex justify-between items-center p-2 border rounded mb-2">
              <a href={resume.data} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {resume.name}
              </a>
              <button onClick={() => handleDelete(index)} className="text-red-500 ml-2">❌</button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No resumes uploaded</p>
        )}
      </ul>
    </div>
  );
};

export default ResumeManager;
