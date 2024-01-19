// src/components/UserRole/UserRole.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserRole = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const history = useHistory();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your logic to handle the selected role

    // Redirect to the appropriate page based on the selected role
    if (selectedRole === 'student') {
      history.push('/student-dashboard');
    } else if (selectedRole === 'teacher') {
      history.push('/teacher-dashboard');
    } else {
      console.error('Invalid role selected');
    }
  };

  return (
    <div>
      <h1>Choose Your Role</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="student"
            checked={selectedRole === 'student'}
            onChange={() => handleRoleSelection('student')}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            value="teacher"
            checked={selectedRole === 'teacher'}
            onChange={() => handleRoleSelection('teacher')}
          />
          Teacher
        </label>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default UserRole;
