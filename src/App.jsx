// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import HomePage from './components/Home/HomePage';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import UserRole from './components/UserRole/UserRole';
// import Student from './components/Accounts/Student';
import Community from './components/Community/Community';
// import Teacher from './components/Accounts/Teacher';
// import Admin from './components/Accounts/Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for different components */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/userrole" element={<UserRole />} />
        {/* <Route path="/student-account" element={<Student />} /> */}
        <Route path="/community" element={<Community />} />
        {/* <Route path="/teacher-account" element={<TeacherDashboard />} />
        <Route path="/admin-account" element={<AdminDashboard />} /> */}
        {/* Add more routes as needed */}

        {/* Default route (optional): Redirect to /homepage when the root URL is accessed */}
        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
