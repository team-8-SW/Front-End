import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const EmailManagement = ({ primaryEmail }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleAddEmail = async () => {
            navigate('/VerifyEmail',{state:{ primaryEmail } });

    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded">
        <div className="mb-6">
          <button className="flex items-center text-gray-600">
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
  

        <button
          onClick={handleAddEmail}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
        >
          Add email address
        </button>
        </div>
    );
};

export default EmailManagement;