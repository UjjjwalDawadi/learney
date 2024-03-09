import React from 'react';
import './CourseSidebar.css';

const CourseSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="course-sidebar">
      <ul>
        <li className={activeTab === 'basicInfo' ? 'active' : ''} onClick={() => setActiveTab('basicInfo')}>Basic Information</li>
        <li className={activeTab === 'intendedUser' ? 'active' : ''} onClick={() => setActiveTab('intendedUser')}>Intended Users</li>
        <li className={activeTab === 'courseContent' ? 'active' : ''} onClick={() => setActiveTab('courseContent')}>Course Content</li>
        <li className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}>Pricing</li>
      </ul>
    </div>
  );
};

export default CourseSidebar;
