import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, checkAdmin } from '../services/authService';

const PrivateRoute = ({ children, adminOnly }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      // Check if the user is authenticated
      if (!isAuthenticated()) {
        setIsLoading(false);
        return;
      }

      // Check if admin status is needed and if the user is an admin
      if (adminOnly) {
        setIsAdmin(checkAdmin());
      }

      setIsLoading(false);
    };

    verifyUser();
  }, [adminOnly]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state while checking
  }

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/Admin/Dashboard" />; // Redirect non-admins to an access denied page
  }

  return children;
};

export default PrivateRoute;
