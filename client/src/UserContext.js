import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create a context for user role
export const UserContext = createContext();

// Create a UserProvider component to wrap your application
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Add this useEffect to update token when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run only once when the component mounts

  // Add this useEffect to update userRole when token changes
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.role;
      setUserRole(userRole);
    }
  }, [token]); // Run whenever the token changes

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
