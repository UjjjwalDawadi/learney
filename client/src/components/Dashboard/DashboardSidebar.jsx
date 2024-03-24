import React from 'react';
import { NavLink } from 'react-router-dom';
import './DashboardSidebar.css'

function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard/1" activeclassname="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" activeclassname="active">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/enrolled-courses" activeclassname="active">Enrolled Courses</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/bookmark" activeclassname="active">Bookmark</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/cart" activeclassname="active">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/settings" activeclassname="active">Settings</NavLink>
        </li>
        <li>
          <NavLink to="/userform" activeclassname="active">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;