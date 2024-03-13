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

  const handleAddSection = () => {
    if (sectionTitle.trim() === '') {
      alert('Please enter a section title.');
    } else if (sections.length >= maxSections) {
      alert('You have reached the maximum number of sections allowed.');
    } else {
      setSections([...sections, { title: sectionTitle, videos: [] }]);
      setSectionTitle('');
    }
  };

  const handleAddVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ fileName: '' });
    setSections(updatedSections);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoUpload = (e, sectionIndex, videoIndex) => {
    console.log('Event:', e); // Log the event object
    const updatedSections = [...sections];
    const file = e.target.files[0];
    console.log('Selected File:', file); // Log the selected file
    updatedSections[sectionIndex].videos[videoIndex] = { file };
    console.log('Updated Sections:', updatedSections); // Log the updated sections array
    setSections(updatedSections);
    console.log('Updated Sections (after setSections):', sections);
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
    const formData = {
      sections,
      imageFile
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
            <p style={{fontSize:'20px'}}>The course thumbnail provides a visual summary of <br/>the course, helping users quickly grasp its content. </p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
        <div>
          <div className='add-course'>
            <h2>Upload Course Activities</h2>
            <div className="input-row">
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Enter section title"
                style={{width : '92%'}}
              />
              <button className='add-field' onClick={handleAddSection}><MdAdd /></button>
            </div>
            <div style={{display:'flex'}}>
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}  className="activity-item">
                  <h2>{`Section ${sectionIndex + 1}: ${section.title}`}</h2>
                  <button onClick={() => handleAddVideo(sectionIndex)} className='add-video'><MdAdd />Add Video</button>
                  <ul style={{listStyle: 'none'}}>
                    {section.videos.map((video, videoIndex) => (
                      <li key={videoIndex}>
                        <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e, sectionIndex, videoIndex)} />
                        {video.fileName && (
                          <>
                            <span>{video.fileName}</span>
                            <button onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}>Delete Video</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button className='delete-field' onClick={() => handleDeleteSection(sectionIndex)}><MdDeleteForever /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className='add-course-btn' onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default CourseContent;
