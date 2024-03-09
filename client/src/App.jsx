import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import CourseCreationPage from './components/Course/AddCourse/CourseCreationPage';
import UserRole from './components/UserRole/UserRole';
import Community from './components/Community/Community';
import StudentDashboard from './components/Subpages/Student/StudentDashboard';
import VideoPlayer from './components/VideoPlayer/VideoPlayer'; // Import VideoPlayer component


function App() {
  const location = useLocation();
  const isUserFormRoute = location.pathname === '/userform' || location.pathname ==='/userrole' 
  || location.pathname ==='/addcourse';

  return (
    <>
      {!isUserFormRoute && <Header />}
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/addcourse" element={<CourseCreationPage/>} />
        <Route path="/userrole" element={<UserRole />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/video-player/:filePath" element={<VideoPlayer />} /> 
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
