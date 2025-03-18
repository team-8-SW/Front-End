import React, { useState } from 'react';
import SocialLogin from '../../components/SocialLogin';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            
            <div className="bg-white shadow-sm rounded-lg px-20 pt-10 pb-8 mb-6 w-full max-w-xlg">
                
                <h2 className="text-3xl font-semibold mb-8 text-center">Sign in</h2>

                
                <div className="mb-6">
                    <SocialLogin />
                </div>

                
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email or Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="email"
                            type="email"
                            placeholder="Email or phone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <a
                        className="inline-block align-baseline text-sm text-blue-600 hover:text-blue-800 mb-6"
                        href="#"
                    >
                        Forgot password?
                    </a>

                    {/* Sign-In Button */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>

            {/* New to LinkedIn Section */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                    New to LinkedIn?{' '}
                    <a
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                        href="#"
                    >
                        Join now
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;