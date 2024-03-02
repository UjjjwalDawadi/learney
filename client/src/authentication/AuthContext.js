import React, { createContext, useContext,useEffect, useState, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user details from local storage
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedUsername && storedUserRole && storedUserEmail) {
      setUsername(storedUsername);
      setUserRole(storedUserRole);
      setUserEmail(storedUserEmail);
      setLoggedIn(true);
    }

    // // Listen for changes in local storage
    // const handleStorageChange = (event) => {
    //   if (event.key === 'username') {
    //     setUsername(event.newValue);
    //   } else if (event.key === 'userRole') {
    //     setUserRole(event.newValue);
    //   } else if (event.key === 'userEmail') {
    //     setUserEmail(event.newValue);
    //   }
    // };

    // window.addEventListener('storage', handleStorageChange);

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange);
    // };
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
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
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
