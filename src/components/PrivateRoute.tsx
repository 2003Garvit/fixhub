// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('user'); // Replace with actual authentication check
};

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, render the nested routes (using Outlet)
  return <Outlet />;
};

export default PrivateRoute;
