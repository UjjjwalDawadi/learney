import React from 'react';
import './StudentDashboard.css';
import Header from '../../Header/Header'; 

const Dashboard = () => {
  return (
    <div>
         <Header/>
      <Sidebar />
      <MainContent />
    </div>
  );
};

const Sidebar = () => {
  const menuItems = ['Dashboard', 'My Profile', 'Enrolled Courses', 'Wishlist', 'Reviews', 'My Quiz Attempts', 'Order History', 'Question & Answer', 'Settings', 'Logout'];
  return (
    <div>
      {menuItems.map(item => <div key={item}>{item}</div>)}
    </div>
  );
};

const MainContent = () => {
  return (
    <div>
      <CourseStatus />
      <InProgressCourses />
    </div>
  );
};

const CourseStatus = () => {
  const statuses = [
    { title: 'Enrolled Courses', count: 1 },
    { title: 'Active Courses', count: 1 },
    { title: 'Completed Courses', count: 0 },
  ];
  return (
    <div>
      {statuses.map(status => (
        <div key={status.title}>
          <div>{status.count}</div>
          <div>{status.title}</div>
        </div>
      ))}
    </div>
  );
};

const InProgressCourses = () => {
  const courses = [
    { title: 'The Complete JavaScript Course 2019', progress: 0, rating: 3.89 },
    // add more courses as needed
  ];
  return (
    <div>
       
      {courses.map(course => (
        <div key={course.title}>
          <div>{course.title}</div>
          <div>Completed Lessons: {course.progress} of 0 lessons</div>
          <div>{course.progress}% Complete</div>
          <div>{course.rating} stars</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
