import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseDetails.css';

function AddCourseForm() {


  const [courseDuration, setCourseDuration] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct form data as a FormData object
    const formData = new FormData();
    formData.append('title', courseName);
    formData.append('description', description);
    formData.append('category', courseType);
    formData.append('duration', courseDuration);
    formData.append('price', coursePrice);
    formData.append('thumbnailFile', thumbnailFile);
    formData.append('videoFile', videoFile);
    formData.append('difficultyLevel', difficultyLevel);


    // Send formData to backend
    try {
      const response = await fetch('/api/add-course', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();

      if (!response.ok) {
        alert('Failed to add course. Please try again.');
      }
      if (data.includes('title')){
        console.log(data);
        alert('Course addded Successfully.');
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
    
  };
  const onClose = () =>{
    navigate('/courses');
  }

  return (
      <form onSubmit={handleSubmit}>
        
        <label className="form-label">
          <span className="course-fields">Course Duration </span>
          <input
            className="form-input"
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
          />
        </label>
        <label className="form-label">
          <span className="course-fields">Course Price </span>
          <input
            className="form-input"
            type="number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
          />
        </label>
        <div style={{display: 'flex'}}>
        <label className="form-label">
          <span className="course-fields">Difficulty Level</span>
          <select
            className="form-input"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
          >
            <option value="">All level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        </div>
        <div>
  <label className="form-label">
    <span className="course-fields">Upload Video</span>
    <input
      className="form-input"
      type="file"
      accept="video/*"
      onChange={(e) => setVideoFile(e.target.files[0])}
    />
  </label>
</div>
<div>
  <label className="form-label">
    <span className="course-fields">Upload Thumbnail Image</span>
    <input
      className="form-input"
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        console.log("Thumbnail File Path:", file.name);
        setThumbnailFile(file);
      }}
    />
  </label>
</div>

        <button className="form-button" type="submit">Add Course</button>
        <button className="form-button" onClick={onClose}>Close</button>
      </form>
  );
}

export default AddCourseForm;
