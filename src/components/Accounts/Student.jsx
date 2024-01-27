import React from 'react';
import Header from '../Home/Header';

const Student = ({ handleNavigation }) => {
  return (
    <div>
      <Header />
      <div className="student-account">
        <div className="sidebar">
          <div className='profile'>

          </div>
          <div className='pages'>
            <ul>
            <li onClick={() => handleNavigation('/courses')}>
                <h2>Charts</h2>
              </li>
              <li onClick={() => handleNavigation('/courses')}>
                <h2>Courses</h2>
              </li>
              <li onClick={() => handleNavigation('/assignments')}>
                <h2>Assignments</h2>
              </li>
            </ul>
          </div>
          <div className="main-content">
            {/* Main content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
