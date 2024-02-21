import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserRole.css'
import studentGif from '../../resources/Images/Student.gif';
import teacherGif from '../../resources/Images/Teacher.gif';
import { jwtDecode } from 'jwt-decode'; 

const UserRole = ({ setUserRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    try {
      const token = new URLSearchParams(location.search).get('token');
      console.log(token);
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.user.id); // Set userId state
      }
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  }, [location.search]); // Run whenever location.search changes

  console.log('User ID:', userId); // Moved outside of useEffect

  const handleRoleSelection = async (role) => {

    const response = await fetch('/api/userRole', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }),
    });
  
    if (response.ok) {
      navigate('/homepage');
      setUserRole(role); // Update the userRole state
    } else {
      alert('Role selection failed');
    }
  }

  return (
    <div className='role-container'>
      <h1>What will be your role?</h1>
      <div className='roles'>
        <div className='student-role'>
          <img src={studentGif} alt="Student" />
          <button className='role-button' onClick={() => handleRoleSelection('Student')}>Join as a Student</button>
        </div>
        <div className='teacher-role'>
          <img src= {teacherGif} alt="Teacher" />
          <button className='role-button' onClick={() => handleRoleSelection('Teacher')}>Join as a Teacher</button>
        </div>
      </div>
    </div>
  );
}

export default UserRole;
