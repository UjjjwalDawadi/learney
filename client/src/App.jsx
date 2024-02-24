import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Home from './components/Home/Home';
import UserForm from './components/UserForm/UserForm';
import Courses from './components/Course/Courses';
import UserRole from './components/UserRole/UserRole';
import Community from './components/Community/Community';

function App() {
  const location = useLocation();
  const isUserFormRoute = location.pathname === '/userform';

  return (

    <>
      {!isUserFormRoute && <Header />}
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/userrole" element={<UserRole />} />
        <Route path="/community" element={<Community />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
