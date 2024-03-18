import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import {firebaseConfig}from "./FireBase"; 
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import CourseCreationPage from './components/Course/AddCourse/CourseCreationPage';
import UserRole from './components/UserRole/UserRole';
import Forum from './components/Forum/Forum';
import CourseDetails from './components/Course/CourseDetails';
import DashboardContainer from './components/Dashboard/DashboardContainer';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
        <Route path="/dashboard/*" element={<DashboardContainer />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} /> 
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
export default App;