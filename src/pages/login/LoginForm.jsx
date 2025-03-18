import React, { useState } from 'react';
import SocialLogin from '../../components/SocialLogin';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login  attempt:', { email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 flex flex-col ">Sign in</h2>
                <button className="w-full  hover:bg-gray-100">
                <SocialLogin/>
               </button>
                <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
       </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        to="/ResetPassword"
                    >
                        Forgot Password?
                    </Link>

                <div className="flex items-center justify-between">
                    <button
                        className="w-full border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-3xl focus:outline-none focus:shadow-outline mt-5 items-center justify-center"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </div>
            <div>
                New to linked in? <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 underline"
                        to="/Signup"
                    >
                       Sign up
                    </Link>
            </div>
        </div>
    );
};

export default LoginForm;