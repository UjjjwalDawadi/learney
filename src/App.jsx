// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import HomePage from './components/Home/HomePage';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses'
import UserRole from './components/UserRole/UserRole';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for different components */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/userrole" element={<UserRole />} />
        {/* Add more routes as needed */}

        {/* Default route (optional): Redirect to /homepage when the root URL is accessed */}
        <Route index element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
