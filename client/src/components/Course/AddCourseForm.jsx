import React, { useState } from 'react';
import './AddCourseForm.css';

function AddCourseForm({ onClose }) {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [description, setDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('');

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
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    // Add additional logic here if needed
  };

  return (
    <div className="add-course-form">
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          <span className="course-fields">Course Title </span>
          <input
            className="form-input"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <label className="form-label">
          <span className="course-fields">Course Description </span>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="form-label">
          <span className="course-fields">Category </span>
          <input
            className="form-input"
            type="text"
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
          />
        </label>
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
      onChange={handleVideoUpload}
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
      onChange={handleThumbnailUpload}
    />
  </label>
</div>

        <button className="form-button" type="submit">Add Course</button>
        <button className="form-button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default AddCourseForm;
