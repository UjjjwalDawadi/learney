import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import EnrolledCourses from './Pages/EnrolledCourses';
import Bookmark from './Pages/Bookmark';
import Cart from './Pages/Cart';
import Settings from './Pages/Settings';
import { useLocation } from 'react-router-dom';

function DashboardContainer() {
  const location = useLocation();

  // Function to render the appropriate page component based on the URL path
  const renderPage = () => {
    switch (location.pathname) {
      case '/dashboard/profile':
        return <Profile />;
      case '/dashboard/enrolled-courses':
        return <EnrolledCourses />;
      case '/dashboard/bookmark':
        return <Bookmark />;
      case '/dashboard/cart':
        return <Cart />;
      case '/dashboard/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default DashboardContainer;
