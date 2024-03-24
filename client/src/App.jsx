import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FireBase";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import CourseCreationPage from './components/Course/AddCourse/CourseCreationPage';
import UserRole from './components/UserRole/UserRole';
import Forum from './components/Forum/Forum';
import CourseDetails from './components/Course/CourseDetails';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import LoadingCircle from './components/Loading/Loading'; // Import the LoadingCircle component

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const location = useLocation();
  const isUserFormRoute = location.pathname === '/userform' || location.pathname === '/userrole' || location.pathname === '/addcourse';

  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Example: Fetching data or initializing Firebase
    // Simulating a loading process
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
        setLoading(false); // Update loading state when loading is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Update loading state even if an error occurs
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  return (
    <>
      {loading && <LoadingCircle />} {/* Render LoadingCircle component when loading is true */}
      {!loading && !isUserFormRoute && <Header />}
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/addcourse" element={<CourseCreationPage />} />
        <Route path="/userrole" element={<UserRole />} />
        <Route path="/dashboard/*" element={<DashboardContainer />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
export default App;
