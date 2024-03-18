import React from 'react';
import { NavLink } from 'react-router-dom';
import './DashboardSidebar.css'

function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard/1" activeClassName="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" activeClassName="active">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/enrolled-courses" activeClassName="active">Enrolled Courses</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/bookmark" activeClassName="active">Bookmark</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/cart" activeClassName="active">Cart</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/settings" activeClassName="active">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/userform" activeClassName="active">Logout</NavLink>
          </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
