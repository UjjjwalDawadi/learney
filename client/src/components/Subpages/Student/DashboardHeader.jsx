// DashboardHeader.jsx

import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = () => {
    return (
        <div className="dashboard-header">
            <div className="header-avatar">
                <div className="avatar">
                    <div className="avatar-ratio">
                        <span className="avatar-text">UD</span>
                    </div>
                </div>
            </div>

            <div className="user-info ">
                <div className="header-display-name">
                    <div className="greetings">
                        Hello,
                    </div>
                    <div className="username">
                        Ujjwal Dawadi
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader; // Correct export statement
