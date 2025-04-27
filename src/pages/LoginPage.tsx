import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get the stored user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('No user found. Please sign up first.');
      return;
    }

    // Parse the stored user data
    const user = JSON.parse(storedUser);

    // Check if entered credentials match the stored ones
    if (user.email === email && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // Redirect to homepage after login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md">Login</button>
      </form>

      <div className="mt-4 text-center">
        <span>Don't have an account?</span> 
        <Link to="/signup" className="text-emerald-600 font-semibold">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
