import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { isAuthenticated, checkAdmin, getToken } from '../services/authService';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const PrivateRoute = ({ children, adminOnly, authorOnly }) => {
  const { id } = useParams(); // Get the news ID from the route params
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try{
      if (!isAuthenticated()) {
        setIsLoading(false);
        return;
      }

      // Get the token and decode it to extract user details
      const token = getToken();
      const decodedToken = jwtDecode(token);
      const userIsAdmin = checkAdmin();
      setIsAdmin(userIsAdmin);

      // Handle admin-only route
      if (adminOnly && !userIsAdmin) {
        setIsLoading(false);
        return;
      }

      // Handle author-only route
      if (authorOnly) {
        if (userIsAdmin) {
          setIsAuthor(true); // Admins can access all pages
        } else {
          try {
            let response;
            try {
              // First, try fetching from the 'published-news' endpoint
              response = await axios.get(`https://onexcricket.onrender.com/api/published-news/${id}`);
            } catch (error) {
              try {
                // If the first call fails, try fetching from the 'news' endpoint
                response = await axios.get(`https://onexcricket.onrender.com/api/news/${id}`);
              } catch (error) {
                console.error('Error fetching news:', error);
                // Handle the error (e.g., return, set a message, or redirect)
                return;
              }
            }
            const newsAuthorId = response.data.author;

            if (decodedToken.username === newsAuthorId || newsAuthorId === '') {
              setIsAuthor(true); // User is either the author or no author is set
            } else {
              setIsAuthor(false); // Explicitly deny access to non-authors
            }
          } catch (err) {
            console.error('Error fetching news:', err);
            setIsAuthor(false); // Block access if there's an error fetching the author
          }
        }
      }
    }
    catch (err) {
      console.error('Error in verification:', err);
    } finally {
      // Always set loading to false at the end of the verification process
      setIsLoading(false);
    }
    };

    verifyUser();
  }, [id, adminOnly, authorOnly]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state while verification is happening
  }

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  // Admin-only route: Allow only admins
  if (adminOnly && !isAdmin) {
    return <Navigate to="/Admin/Dashboard" />;
  }

  // Author-only route: Allow only the author or admins
  if (authorOnly && !isAuthor && !isAdmin) {
    return <Navigate to="/Admin/Dashboard" />;
  }

  return children;
};

export default PrivateRoute;
