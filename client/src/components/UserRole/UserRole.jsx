import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRole.css'
import studentGif from '../../resources/Images/Student.gif';
import teacherGif from '../../resources/Images/Teacher.gif';


const UserRole = () => {
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await fetch('/api/selectRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors.map((error) => error.msg).join('\n'));
      }

      const data = await response.text();

      if (data.includes('Role updated successfully')) {
        navigate('/homepage');
      } else {
        console.error('Error');
      
      }
    } catch (err) {
      console.error('Error selecting role:', err);
      
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
