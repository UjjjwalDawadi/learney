import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Course from './Course';
import './Courses.css';

import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from 'react-icons/tb';
import SideBar from './SideBar';
import axios from 'axios';

function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [ratings, setRatings] = useState({}); // State to store ratings for each course
  const [reviewCounts, setReviewCounts] = useState({}); // State to store review counts for each course
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

  useEffect(() => {
    const fetchRatingsAndReviewCounts = async () => {
      try {
        const ratingPromises = courses.map(async (course) => {
          const response = await axios.get(`/api/get-ratings/${course.id}`);
          const ratings = response.data;
          const totalRatingValue = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
          const averageRating = ratings.length > 0 ? totalRatingValue / ratings.length : 0;
          setRatings((prevRatings) => ({ ...prevRatings, [course.id]: averageRating }));
          setReviewCounts((prevReviewCounts) => ({ ...prevReviewCounts, [course.id]: ratings.length }));
        });

        await Promise.all(ratingPromises);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatingsAndReviewCounts();
  }, [courses]);

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
                <Course
                  key={course.id}
                  courseId={course.id}
                  title={course.title}
                  courseDuration={course.courseDuration}
                  price={course.price}
                  thumbnailPath={course.thumbnailPath}
                  uploadedBy={course.uploadedBy}
                  rating={ratings[course.id] || 0} // Pass rating for this course
                  reviewCount={reviewCounts[course.id] || 0} // Pass review count for this course
                />
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
