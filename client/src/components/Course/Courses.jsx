import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Course from './Course';
import './Courses.css';

import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from "react-icons/tb";
import SideBar from './SideBar';

function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(null);
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

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
      {userRole === 'Student' && (
  <>
    <SideBar sidebarOpen={sidebarOpen} courses={courses} setFilteredCourses={setFilteredCourses} />
    <button className="arrow" onClick={() => setSidebarOpen(!sidebarOpen)}>
      {sidebarOpen ? <span title='Hide Sidebar'><TbArrowBadgeLeftFilled /></span> : <span title='Show Sidebar'><TbArrowBadgeRightFilled /></span>}
    </button>
  </>
)}
      {userRole === 'Teacher' && <button className="addcourse" onClick={() => navigate('/addcourse')}>Add Course</button>}

      <div className='course-items'>
        <h1>Available Courses</h1>
        <div className="courses-list">
          {(filteredCourses === null ? courses : filteredCourses).length > 0 ? (
            (filteredCourses === null ? courses : filteredCourses).map((course) => {
              return (
                <Course key={course.id}courseId={course.id} title={course.title} courseDuration={course.courseDuration} price={course.price} thumbnailPath={course.thumbnailPath} uploadedBy={course.uploadedBy}  />
              );
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
