import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from '../../Course/Course';
import {useNavigate} from 'react-router-dom';
import EmptyPage from '../../../resources/Images/noDataFound.png';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const fetchCourses = async () => {
    try {
      const fullName = localStorage.getItem('fullName');
      const response = await axios.get(`/api/uploaded-courses/${fullName}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDropdownClick = (courseId) => {
    setSelectedCourseId(courseId === selectedCourseId ? null : courseId);
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/delete-course/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const editCourse = (courseId) => {
    console.log('Edit course', courseId);
    handleNavigation(`/courses/${courseId}/edit`)
    
  };

  return (
    <div>
      {courses.length === 0 ? (
        <div className='empty-page'>
          <img src={EmptyPage} alt="No data found" />
        </div>
      ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
        {courses.map((course) => (
          <div key={course.id}>
            <Course
              title={course.title}
              price={course.price}
              courseDuration={course.courseDuration}
              uploadedBy={course.uploadedBy}
              thumbnailPath={course.thumbnailPath}
              rating={course.rating}
              reviewCount={course.ratingCount}
              courseId={course.id}
              onRemoveFromBookmark={deleteCourse}
              isOpen={selectedCourseId === course.id}
              onDropdownClick={handleDropdownClick}
              onEditCourse={editCourse}
              onDeleteCourse={deleteCourse}
            />
            
          </div>
        ))}
      </div>
      )};
    </div>
  );
}

export default MyCourses;
