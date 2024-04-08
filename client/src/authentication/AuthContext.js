import React, { createContext, useContext,useEffect, useState, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user details from local storage
    const storedUserRole = localStorage.getItem('userRole');

    if (storedUserRole ) {
      setUserRole(storedUserRole);
      setLoggedIn(true);
    }

  }, []);

  const login = async (username,userRole,userEmail) => {
  setUsername(username);
  setUserRole(userRole);
  setUserEmail(userEmail);
  setLoggedIn(true);
  console.log('Logged in as:', username);
};
const register = async (username,role,userEmail) => {
  setUsername(username);
  setUserRole(role);
  setUserEmail(userEmail);
  setLoggedIn(true);
  console.log('Registered as:', username);
};
  const logout = () => {
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');

    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserRole(null); // Reset userRole when logging out
    console.log('Logged out');
  };

  const contextValue = useMemo(() => ({
    loggedIn,
    username,
    userRole,
    userEmail,
    login,
    register,
    logout,
  }), [loggedIn, username, userRole,userEmail]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};