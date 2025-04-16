import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { updateEmail } from '../../services/api';

const EmailManagement = ({ primaryEmail, userId }) => {
    const [newEmail, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleUpdateEmail = async () => {
      try {
        const response = await updateEmail(newEmail , userId);
        alert(response.message || 'Email updated successfully!');
        navigate(-1); 
    } catch (error) {
        console.error('Error updating email:', error);
        alert('Failed to update email. Please try again.');
    }
    };
    const handleBack = () => {
      navigate(-1); 
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded">
        <div className="mb-6">
          <button onClick={handleBack} className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
  
        
        <div className="mb-2">
          <h2 className="text-xl font-bold">Email addresses</h2>
          <p className="text-gray-600">Emails you've added</p>
        </div>
  
       
        <div className="mt-6 mb-6">
          <p className="text-gray-700 font-medium mb-2">Primary email</p>
          <p className="text-gray-900">{primaryEmail}</p>
        </div>
        
        <input
                type="email"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
                className="border border-gray-300 p-2 rounded w-full mb-4"
            />

        <button
          onClick={handleUpdateEmail}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
        >
          Update email address
        </button>
        </div>
    );
};

export default EmailManagement;