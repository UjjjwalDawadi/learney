// DashboardSidebar.jsx

import React from 'react';
import './DashboardSidebar.css'; // Import the extracted CSS file

const DashboardSidebar = () => {
    return (
        <div className="dashboard-sidebar">
            <ul className="dashboard-menu">
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Dashboard</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">My Profile</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Enrolled Courses</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Wishlist</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Cart</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Setting</span>
                    </a>
                </li>
                <li className="dashboard-menu-item">
                    <a href="#" className="dashboard-menu-link">
                        <span className="dashboard-menu-icon"></span>
                        <span className="dashboard-menu-text">Logout</span>
                    </a>
                </li>
                {/* Add more menu items as needed */}
            </ul>
        </div>
    );
};

export default DashboardSidebar;
