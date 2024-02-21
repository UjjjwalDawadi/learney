import React, {  useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './authentication/AuthContext'; // Import AuthProvider
import { UserProvider } from './UserContext'; // Import UserProvider
import { jwtDecode } from 'jwt-decode';

// Import your components
import HomePage from './components/Home/HomePage';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import UserRole from './components/UserRole/UserRole';
import Header from './components/Home/Header';
import Community from './components/Community/Community';
import StudentDashboard from './components/DashBoards/StudentDashboard'

function App() {
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
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <UserProvider value={{ userRole, setUserRole }}> {/* Wrap your application with UserProvider */}
        <Router>
          <Routes>
            {/* Define routes for different components */}
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/" element={<Header />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/userrole" element={<UserRole setUserRole={setUserRole} />} />
            <Route path="/community" element={<Community />} />

            {/* Default route (optional): Redirect to /homepage when the root URL is accessed */}
            <Route index element={<HomePage />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider> 
  );
}

export default App;
