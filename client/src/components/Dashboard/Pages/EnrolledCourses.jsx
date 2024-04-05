import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from '../../Course/Course';
import EmptyPage from '../../../resources/Images/noDataFound.png';

function EnrolledCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/enrollments/${userId}`);
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error.message);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (!enrolledCourses) {
    return <div>Loading...</div>; // Render a loading indicator while enrolledCourses is undefined
  }

  return (
    <div>
      <h2>Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <div className='empty-page'>
          <img src={EmptyPage} alt="No data found" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
          {enrolledCourses.map(enrolledCourse => (
            <div key={enrolledCourse.enrollmenId}>
              <Course
                title={enrolledCourse.course.title} 
                price={enrolledCourse.course.price} 
                courseDuration={enrolledCourse.course.courseDuration} 
                uploadedBy={enrolledCourse.course.uploadedBy} 
                thumbnailPath={enrolledCourse.course.thumbnailPath} 
                courseId={enrolledCourse.course.id} 
                enrollmentId={enrolledCourse.enrollmentId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCoursesPage;
