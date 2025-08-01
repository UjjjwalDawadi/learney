import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import Course from './Course';
import './Courses.css';
import EmptyPage from '../../resources/Images/noDataFound.png';
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from 'react-icons/tb';
import SideBar from './SideBar';
import axios from 'axios';

function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(null);
  const headerFilteredCourses =location.state ? location.state.courses : [];
  console.log(headerFilteredCourses,".....")
  const [statusFilter, setStatusFilter] = useState('approved');
  const [ratings, setRatings] = useState({}); 
  const [reviewCounts, setReviewCounts] = useState({}); 
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        console.log(data)
        setCourses(data)
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

  // Filter courses based on status
  useEffect(() => {
    const filtered = courses.filter(course => course.status === statusFilter);
    setFilteredCourses(filtered);
  }, [courses, statusFilter]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
console.log('fc',filteredCourses)
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
        <div className='head'>
          <h1>Available Courses</h1>
          {userRole === 'Admin' && (
            <div className='admin-course-filter'>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>
        <div className="courses-list">
          {(headerFilteredCourses && headerFilteredCourses.length > 0) ? (
            headerFilteredCourses.map((course) => (
              <Course
                key={course.id}
                courseId={course.id}
                title={course.title}
                courseDuration={course.courseDuration}
                status={course.status}
                price={course.price}
                thumbnailPath={course.thumbnailPath}
                uploadedBy={course.uploadedBy}
                rating={ratings[course.id] || 0}
                reviewCount={reviewCounts[course.id] || 0}
              />
            ))
          ) : (
            (filteredCourses === null || filteredCourses.length === 0) ? (
              <div className='empty-page' style={{width: '95%'}}>
                <img src={EmptyPage} alt="No data found" />
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Course
                  key={course.id}
                  courseId={course.id}
                  title={course.title}
                  courseDuration={course.courseDuration}
                  status={course.status}
                  price={course.price}
                  thumbnailPath={course.thumbnailPath}
                  uploadedBy={course.uploadedBy}
                  rating={ratings[course.id] || 0}
                  reviewCount={reviewCounts[course.id] || 0}
                />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
