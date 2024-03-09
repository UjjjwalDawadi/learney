import React from 'react';
// import { useNavigate } from 'react-router-dom';

const CourseContent = ({ nextStep }) => {
//   const navigate = useNavigate();

  return (
    <div className="course-form-container">
      <h1>Course Content</h1>
      {/* Add file upload for course image */}
      {/* Add file upload for course videos (multiple) */}
      <button className='add-course-btn' onClick={() => nextStep()}>Next</button>
    </div>
  );
};

export default CourseContent;
