import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaUser, FaBookmark, FaBook, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons
import './DashboardSidebar.css';

function DashboardSidebar() {
  const userRole = localStorage.getItem('userRole');
  return (
    <div className="dashboard-sidebar">
      <ul>
      {userRole === 'Admin' && ( 
<>
        <li>
          
          <NavLink to="/dashboard/1" activeClassName="active"><FaChartBar />Dashboard</NavLink>
        </li>
        </>
      )}
        <li>
          
          <NavLink to="/dashboard/profile" activeClassName="active"><FaUser />My Profile</NavLink>
        </li>
       
        {userRole === 'Student' && ( 
          <>
            <li>
              <NavLink to="/dashboard/enrolled-courses" activeClassName="active"><FaBook />Enrolled Courses</NavLink>
            </li>
            <li>
              
              <NavLink to="/dashboard/bookmark" activeClassName="active"><FaBookmark />  Bookmark</NavLink>
            </li>
          </>
        )}
        {userRole === 'Teacher' && ( 
          <>
            <li>
              
              <NavLink to="/dashboard/my-courses" activeClassName="active"> <FaBook/>My Courses</NavLink>
            </li>
          </>
        )}
         {userRole === 'Admin' && ( 
          <>
            <li>
              
              <NavLink to="/dashboard/" activeClassName="active"><FaUsers />Manage Users</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/dashboard/settings" activeClassName="active"> <FaCog/> Settings</NavLink>
        </li>
        <li>
          
          <NavLink to="/userform" activeClassName="active"><FaSignOutAlt /> Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
