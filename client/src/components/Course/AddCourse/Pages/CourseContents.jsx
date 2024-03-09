import React, { useState } from 'react';
import { MdDeleteForever, MdAdd } from "react-icons/md";
import CourseImage from '../../../../resources/Images/courseUpload.png'; 
import './CourseContents.css'


const CourseContent = ({ nextStep }) => {
    const initialImageUrl = CourseImage;
      const [imageFile, setImageFile] = useState(initialImageUrl);
    const maxSections = 10; // Maximum number of sections allowed
    const [sections, setSections] = useState([]); // State to manage sections
    const [sectionTitle, setSectionTitle] = useState(''); // State to manage section title input

    // Function to handle adding a new section
    const handleAddSection = () => {
        if (sectionTitle.trim() === '') {
            alert('Please enter a section title.');
        } else if (sections.length >= maxSections) {
            alert('You have reached the maximum number of sections allowed.');
        } else {
            setSections([...sections, { title: sectionTitle, videos: [] }]);
            setSectionTitle(''); // Reset section title input after adding a section
        }
    };

    // Function to handle adding a video to a section
    const handleAddVideo = (sectionIndex) => {
        const updatedSections = [...sections];
        const fileInput = (
            <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e, sectionIndex)} />
        );
        updatedSections[sectionIndex].videos.push({ fileInput, fileName: '' });
        setSections(updatedSections);
    };        

      // Function to handle file selection for course image
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
      };
    

    // Function to handle uploading a video file
    const handleVideoUpload = (e, sectionIndex) => {
        const updatedSections = [...sections];
        const file = e.target.files[0];
        const fileName = file ? file.name : '';
        updatedSections[sectionIndex].videos.pop(); // Remove the input field
        updatedSections[sectionIndex].videos.push({ fileInput: '', fileName });
        setSections(updatedSections);
    };

    // Function to handle deleting a video from a section
    const handleDeleteVideo = (sectionIndex, videoIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].videos.splice(videoIndex, 1);
        setSections(updatedSections);
    };

    // Function to handle deleting a section
    const handleDeleteSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
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
                        {/* Button to add a new section */}
                        <button className='add-field' onClick={handleAddSection}><MdAdd /></button>
                        </div>
                        <div style={{display:'flex'}}>
                        {/* Display sections */}
                        {sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}  className="activity-item">
                                {/* Section title */}
                                <h2>{`Section ${sectionIndex + 1}: ${section.title}`}</h2>
                                <button onClick={() => handleAddVideo(sectionIndex)} className = 'add-video'><MdAdd />Add Video</button>
                                <ul style={{listStyle: 'none'}}>
                                    {section.videos.map((video, videoIndex) => (
                                        <li key={videoIndex}>
                                            {video.fileInput}
                                            {video.fileName && (
                                                <>
                                                    <span>{video.fileName}</span>
                                                    <button >Delete Video</button>
                                                    <button className='delete-field' onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}><MdDeleteForever /></button>

                                                </>
                                            )}
                                        </li>
                                        
                                    ))}
                                </ul>
                                {/* Button to delete section */}
                                <button className='delete-field' onClick={() => handleDeleteSection(sectionIndex)}><MdDeleteForever /></button>
                            </div>
                            
                        ))}
                        </div>
                    </div>
                    </div>
                    </div>
                    {/* Button to proceed to the next step */}
                    <button className='add-course-btn' onClick={() => nextStep()}>Next</button>
            </div>
                );
};

                export default CourseContent;
