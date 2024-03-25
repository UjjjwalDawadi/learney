import React, { useState } from 'react';
import { MdDeleteForever, MdAdd } from "react-icons/md";
import CourseImage from '../../../../resources/Images/courseUpload.png'; 
import './Contents.css';

const CourseContent = ({ nextStep }) => {
  const initialImageUrl = CourseImage;
  const [imageFile, setImageFile] = useState(initialImageUrl);
  const maxSections = 10;
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [imageError, setImageError] = useState('');
  const [sectionError, setSectionError] = useState('');
  const [videoError, setVideoError] = useState('');

  const handleAddSection = () => {
    if (sectionTitle.trim() === '') {
      setSectionError('Please enter a section title.');
      return;
    } else if (sections.length >= maxSections) {
      setSectionError('You have reached the maximum number of sections allowed.');
      return;
    } else {
      setSections([...sections, { title: sectionTitle, videos: [] }]);
      setSectionTitle('');
      setSectionError('');
    }
  };

  const handleAddVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ title: '', file: null, duration: 0 });
    setSections(updatedSections);
  };
  

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoUpload = (e, sectionIndex, videoIndex) => {
    const updatedSections = [...sections];
    const file = e.target.files[0];
    const title = updatedSections[sectionIndex].videos[videoIndex].title;
  
    const video = document.createElement('video');
    video.preload = 'metadata';
  
    video.onloadedmetadata = function() {
      const duration = video.duration;
      let formattedDuration;
  
      if (duration < 3600) { // Less than 1 hour
        const minutes = Math.floor(duration / 60);
        const seconds = Math.round(duration % 60);
        formattedDuration = `${minutes}m:${seconds}s`;
      } else { // Equal to or greater than 1 hour
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        formattedDuration = `${hours}hr:${minutes}m`;
      }
  
      updatedSections[sectionIndex].videos[videoIndex] = { title, file, duration: formattedDuration };
      
      // Calculate total duration for the section
      let totalDuration = 0;
      updatedSections[sectionIndex].videos.forEach(video => {
        const [minutes, seconds] = video.duration.split(':').map(parseFloat);
        totalDuration += minutes * 60 + seconds;
      });
  
      // Format section duration
      let formattedSectionDuration;
      if (totalDuration < 3600) { // Less than 1 hour
        const minutes = Math.floor(totalDuration / 60);
        const seconds = Math.round(totalDuration % 60);
        formattedSectionDuration = `${minutes}m:${seconds}s`;
      } else { // Equal to or greater than 1 hour
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
        formattedSectionDuration = `${hours}hr:${minutes}m`;
      }
  
      updatedSections[sectionIndex].sectionDuration = formattedSectionDuration; // Set the formatted section duration
      setSections(updatedSections);
      setVideoTitle('');
    };
  
    video.src = URL.createObjectURL(file);
  };
  
  
  
  const handleDeleteVideo = (sectionIndex, videoIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.splice(videoIndex, 1);
    setSections(updatedSections);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    // Validate image
    if (imageFile === initialImageUrl) {
      setImageError('Please upload a course thumbnail.');
      return;
    } else {
      setImageError('');
    }
  
    // Validate sections
    if (sections.length === 0) {
      setSectionError('Please add at least one section.');
      return;
    } else {
      setSectionError('');
    }
  
    // Validate videos in each section
    const hasVideos = sections.some(section => section.videos.length > 0);
    if (!hasVideos) {
      setVideoError('Please add at least one video in the section.');
      return;
    } else {
      setVideoError('');
    }
    // Calculate total course duration
    let totalCourseDuration = 0;
    sections.forEach(section => {
      const [hours, minutes] = section.sectionDuration.split(':').map(parseFloat);
      totalCourseDuration += hours * 3600 + minutes * 60; // Convert section duration to seconds and accumulate
    });
  
    // Format course duration
    let formattedCourseDuration;
    if (totalCourseDuration < 3600) { // Less than 1 hour
      const minutes = Math.floor(totalCourseDuration / 60);
      const seconds = Math.round(totalCourseDuration % 60);
      formattedCourseDuration = `${minutes}m:${seconds}s`;
    } else { // Equal to or greater than 1 hour
      const hours = Math.floor(totalCourseDuration / 3600);
      const minutes = Math.floor((totalCourseDuration % 3600) / 60);
      formattedCourseDuration = `${hours}hr:${minutes}m`;
    }
  
    // If all validations pass, proceed to the next step
    const formData = {
      sections,
      imageFile,
courseDuration: formattedCourseDuration
    };
    console.log('Course data:', formData);
    nextStep(formData);
  };

  return (
    <div className="course-form-container">
      <h1>Course Content</h1>
      <div className='add-course'> 
        <h2>Upload Course Thumbnail</h2>
        <div className="content-section"> 
          <div className="image-container">
            {imageFile && (
              <img src={typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile)} alt="Course Thumbnail" />
            )}
          </div>
          <div className="info-container">
            <p style={{fontSize:'18px'}}>The course thumbnail provides a visual summary of <br/>the course, helping users quickly grasp its content. </p>
            <span className="error-msg">{imageError}</span>

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
        <div>
          <div className='add-course' style={{padding:'0'}}>
            <h2>Upload Course Activities</h2>
            <span className="error-msg">{sectionError}</span>
            <span className="error-msg">{videoError}</span>

            <div className="input-row">
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Enter section title    eg. Introduction"
                style={{width : '85%'}}
              />
              <button className='add-section' onClick={handleAddSection}>Add</button>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              {sections.map((section, sectionIndex) => (
                
                <div key={sectionIndex}  className="activity-item">
                  <h2>{`Section ${sectionIndex + 1}: ${section.title}`}</h2>
                  
                  <button onClick={() => handleAddVideo(sectionIndex)} className='add-video'><MdAdd />Add Video</button>
                  <ul style={{listStyle: 'none'}}>
                    {section.videos.map((video, videoIndex) => (
                      <li key={videoIndex}>
                        <input 
      type="text" 
      placeholder="Enter video title" 
      value={video.title || ''} // Set initial value to video title if it exists
      onChange={(e) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].videos[videoIndex].title = e.target.value;
        setSections(updatedSections);
      }}
    />
                        <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e, sectionIndex, videoIndex)} />
                        {video.fileName && (
                          <>
                            <span>{video.fileName}</span>
                          </>
                        )}
                        <button style={{fontSize:'35px',verticalAlign:'middle'}} onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}><MdDeleteForever /></button>

                      </li>
                    ))}
                  </ul>
                  <button className='delete-section' onClick={() => handleDeleteSection(sectionIndex)}><MdDeleteForever/></button>

                </div>
                
              ))}
              
            </div>
          </div>
        </div>
      </div>
      <button className='add-course-btn' onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default CourseContent;
