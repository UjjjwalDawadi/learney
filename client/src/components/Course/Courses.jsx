import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Course from './Course';
import './Courses.css';
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from "react-icons/tb";
import SideBar from './SideBar'; // import the SideBar component

function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(null); // Initialize filteredCourses state with null
  const userRole =  localStorage.getItem( 'userRole');

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar sidebarOpen={sidebarOpen} courses={courses} setFilteredCourses={setFilteredCourses} />
      <button className="arrow " onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <span title='Hide Sidebar'><TbArrowBadgeLeftFilled /></span> : <span title='Show Sidebar'><TbArrowBadgeRightFilled /></span>}
      </button>

      {userRole === 'Teacher' &&<button className="addcourse" onClick={() => handleNavigation('/addcourse')}>Add Course</button>}

      <div className='course-items'>
       <h1>Available Courses</h1>
       <div  className="courses-list">
       {(filteredCourses === null ? courses : filteredCourses).length > 0 ? (
          (filteredCourses === null ? courses : filteredCourses).map((course) => {
            return <Course key={course.id} title={course.title} duration={course.duration} price={course.price} />;
          })
        ) : (
          <p className="no-courses">No courses found!</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default Courses;
