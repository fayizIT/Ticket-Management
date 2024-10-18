


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth'; 

const AdminLogin: React.FC = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset the error state
    try {
      const response = await fetch('http://localhost:3000/admin-auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials'); 
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('accessToken', data.access_token.access_token); 
  
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || 'An error occurred');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100"> {/* Light gray background for the entire screen */}
      {/* AdminLogin Container */}
      <div className="min-w-[400px] flex-col border bg-white px-10 py-16 shadow-lg rounded-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Admin Login</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="mb-8 flex justify-center">
          <img
            className="w-32"
            src="https://foggymountain.in/sitepad-data/uploads/2024/01/20240110_101452_0000.jpg"
            alt="Foggy Mountain Admin Side"
          />
        </div>
        <div className="flex flex-col text-base rounded-md">
          <input
            className="mb-5 rounded-lg border p-4 hover:outline-none focus:outline-none hover:border-yellow-500"
            type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            placeholder="Username or Email"
          />
          <input
            className="border rounded-lg p-4 hover:outline-none focus:outline-none hover:border-yellow-500"
            type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
            placeholder="Password"
          />
        </div>
               {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="mt-5 w-full border p-3 bg-gradient-to-r from-gray-800 bg-gray-600 text-white rounded-lg hover:bg-gray-500 scale-105 duration-300"
          type="submit"
        >
          Sign in
        </button>
        {/* <div className="mt-5 flex justify-between text-sm text-gray-600">
          <a href="#">Forgot password?</a>
          <a href="#">Sign up</a>
        </div>
        <div className="flex justify-center mt-5 text-sm">
          <p className="text-gray-400">or sign in with</p>
        </div>
        <div className="mt-5 flex justify-center gap-3">
          <img
            className="h-8 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300"
            src="" // Add Google sign-in icon source
            alt="Google Sign in"
          />
          <img
            className="h-8 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300"
            src="" // Add Github sign-in icon source
            alt="Github Sign in"
          />
          <img
            className="h-8 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300"
            src="" // Add LinkedIn sign-in icon source
            alt="LinkedIn Sign in"
          />
        </div>*/}
        </form> 
      </div>
    </div>
  );
};

export default AdminLogin;

