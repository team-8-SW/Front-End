import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
    return (
        <div className="h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;