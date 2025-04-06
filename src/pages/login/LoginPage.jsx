import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({setLoggedUser}) => {
    return (
        <div className="h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center">
                <LoginForm setLoggedUser={setLoggedUser}/>
            </div>
        </div>
    );
};

export default LoginPage;