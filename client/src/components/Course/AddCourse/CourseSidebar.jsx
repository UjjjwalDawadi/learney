import React from 'react';
import './CourseSidebar.css';
import { useNavigate } from 'react-router-dom';


const CourseSidebar = ({ activeTab, setActiveTab }) => {
const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/courses'); 
  };
  return (
    <div className="course-sidebar">
<button className="back" onClick={handleNavigation}>Cancel</button>
      <ul>
        <li className={activeTab === 'basicInfo' ? 'active' : ''} >Basic Information</li>
        <li className={activeTab === 'intendedUser' ? 'active' : ''} >Intended Users</li>
        <li className={activeTab === 'courseContent' ? 'active' : ''} >Course Content</li>
        <li className={activeTab === 'pricing' ? 'active' : ''} >Pricing</li>
      </ul>
    </div>
  );
};

export default CourseSidebar;