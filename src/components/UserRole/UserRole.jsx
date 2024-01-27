import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRole.css'
import studentGif from '../../resources/Images/Student.gif';
import teacherGif from '../../resources/Images/Teacher.gif';

const UserRole = () => {
    const navigate = useNavigate();
    const handleRoleSelection = (role) => {
        alert(`You have chosen to join Learney as a ${role}!`);
        navigate('/homepage');
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
