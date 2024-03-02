// Dashboard.js

import React from 'react';
import './StudentDashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const StudentDashboard = () => {
    return (
        <div>
        <DashboardHeader />
        <div style={{display: 'flex'} }>
            <DashboardSidebar />
<div className="details-cards">
            <div className="enrolled-courses">
                <div className="course-details-card">
                    <h2>Enrolled Courses</h2>
                    <p>1</p>
                </div>
            </div>

            {/* Active Courses */}
            <div className="active-courses">
                <div className="course-details-card">
                    <h2>Active Courses</h2>
                    <p>1</p>
                </div>
            </div>

            {/* Completed Courses */}
            <div className="completed-courses">
                <div className="course-details-card">
                    <h2>Completed Courses</h2>
                    <p>1</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default StudentDashboard;
