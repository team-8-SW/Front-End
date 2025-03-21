
import React, { useState } from 'react';


const VerifyEmail = ({primaryEmail}) => {
    const [pin, setPin] = useState('');

    const handleSubmit = async () => {
        try {
            await verifyEmailCode(pin);
            alert('Email verified successfully!');
            setPin('');
        } catch (error) {
            console.error('Error verifying email:', error);
            alert('Failed to verify email.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded">
        <div className="mb-6">
          <button 
            className="flex items-center text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-bold">Email addresses</h2>
          <p className="text-gray-700 mt-2">We sent a code to your email</p>
          <p className="text-gray-600 mt-2">Enter the verification code sent to{primaryEmail} </p>
        </div>
  
       
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter 6-digit PIN"
          className="w-full p-2 border rounded mb-4"
          maxLength={6}
        />
  
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
  
        <div className="mt-4 text-sm text-gray-600">
          <p>If you don't see the email in your inbox, check your spam folder.</p>
        </div>
    </div>
    );
};

export default VerifyEmail;