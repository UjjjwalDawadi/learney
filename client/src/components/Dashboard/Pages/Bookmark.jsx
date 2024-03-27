import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from '../../Course/Course';
import EmptyPage from '../../../resources/Images/noDataFound.png';

function BookmarkPage() {
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

  useEffect(() => {
    // Fetch bookmarked courses from the backend when the component mounts
    fetchBookmarkedCourses();
  }, []);

  // Function to fetch bookmarked courses from the backend
  const fetchBookmarkedCourses = async () => {
    try {
      // Make a GET request to fetch bookmarked courses
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/bookmarks/${userId}`);
      setBookmarkedCourses(response.data); // Assuming response.data is an array of bookmarked courses
    } catch (error) {
      console.error('Error fetching bookmarked courses:', error);
    }
  };

  const removeFromBookmark = async (bookmarkId) => {
    try {
      // Remove the bookmark from the list of bookmarked courses
      setBookmarkedCourses(prevCourses =>
        prevCourses.filter(course => course.bookmarkId !== bookmarkId)
      );
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <div>
      <h2>Bookmarked Courses</h2>
      {bookmarkedCourses.length === 0 ? (
        <div className='empty-page'>
          <img src={EmptyPage} alt="No data found" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
          {bookmarkedCourses.map((bookmarkedCourse) => (
            <div key={bookmarkedCourse.bookmarkId}>
              <Course
                title={bookmarkedCourse.course.title} 
                price={bookmarkedCourse.course.price} 
                courseDuration={bookmarkedCourse.course.courseDuration} 
                uploadedBy={bookmarkedCourse.course.uploadedBy} 
                thumbnailPath={bookmarkedCourse.course.thumbnailPath} 
                courseId={bookmarkedCourse.course.id} 
                bookmarkId={bookmarkedCourse.bookmarkId}
                onRemoveFromBookmark={removeFromBookmark} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkPage;
