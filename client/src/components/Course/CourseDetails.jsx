// CourseDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IoTimeOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { PiStudentDuotone,PiCellSignalHighLight } from "react-icons/pi";
import { FaRegBookmark,FaBookmark,FaRegHandPointRight,FaArrowAltCircleDown,FaVideo } from 'react-icons/fa';


import './CourseDetails.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);



  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // const { updatedAt } = courseDetails.course.updatedAt;
  // const dateOnly = new Date(updatedAt).toLocaleDateString();
  const handleWishlistClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }
  const handleSectionClick = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };
  



  return (
    <div className="course-details-container">
      <div className="course-details-left">
      <div className='banner'>
        <div className="course-details">
          <h1>{courseDetails.course.title} </h1>
          <p>{courseDetails.course.description}</p>
          <p style={{color:'yellow'}}>Ratings and reviews will display here</p>
          <p style={{marginTop:'15px'}}>Uploaded by: {courseDetails.course.uploadedBy}</p>
          <p style={{color: 'rgb(250 22 6 / 88%)', cursor:'pointer',marginTop:'15px'}}>{courseDetails.course.category}</p>
        </div>
        </div> 
        <div className="course-details">
  <h2>What will you learn</h2>
  <div className="learning-objectives">
    {courseDetails.learningObjectives.map((objective, index) => (
      <div className="learning-objective" key={index}>
        <FaRegHandPointRight />
        {objective.objectives}
      </div>
    ))}
  </div>
</div>
        {/* Video Popup */}
        {selectedVideo && (
          <div className="video-popup">
            <div className="video-popup-content">
              <video src={selectedVideo.url} controls />
              <button onClick={closeVideoPopup}>Close</button>
            </div>
          </div>
        )}
        <div className="course-details">
  <h2>Contents</h2>
  {courseDetails.sections.map((section, index) => (
    <div key={index} className="section-wrapper">
      <div className="section-header" onClick={() => handleSectionClick(section)}>
        <h3>Module {index + 1}: {section.title}      
         <FaArrowAltCircleDown className={selectedSection === section ? 'rotate' : ''} />
</h3>
      </div>
      {selectedSection === section && (
        <ul className="video-list">
          {section.videos.map((video, videoIndex) => (
            <li key={videoIndex} onClick={() => handleVideoClick(video)}>
              <FaVideo/>{video.title} {/* Display video title */}
            </li>
          ))}
        </ul>
      )}
    </div>
  ))}
</div>

        <div className="course-details">
          <h2>Review</h2>
          reviews will come here
        </div>
      </div>
      <div className="course-details-right">
        <div className="upper-right">
        <h2>${courseDetails.course.price}</h2>
        <div className="buttons">
          <button className='btn-1' >Add to Cart</button>
          <button className='btn-2' onClick={handleWishlistClick}>
      <span title='Add to wishlist'>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</span>
    </button>
          <div>
          <button className='btn-3'>Buy Now</button>
        </div>
        </div>
        <div className="course-dtls-rt">
        <p><span className="right-icons">
       <PiStudentDuotone/></span> Students Enrolled {courseDetails.studentsEnrolled}</p>
        <p><span className="right-icons">
       <PiCellSignalHighLight/></span>{courseDetails.course.difficultyLevel} Level Difficulty </p>
        <p><span className="right-icons">
       <IoTimeOutline/></span> Duration {courseDetails.course.duration}</p>
        <p><span className="right-icons">
       <GrUpdate/></span>Updated on {courseDetails.course.updatedAt}  </p>
      </div>
      </div>
      <div className="course-dtls-rt">
        <h2>This course includes</h2>
        <ul >
        <li >{courseDetails.sections.reduce((total, section) => total + section.videos.length, 0)} <span style={{marginLeft:'5px'}}>on-demand videos</span></li>
  <li  >Lifetime Access</li>
  </ul>
</div>
      
      <div className="course-dtls-rt">
          <h2>Requirements</h2>
        <ul>
          {courseDetails.learnerRequirements.map((requirement, index) => (
            <li key={index}>{requirement.requirements}</li>
          ))}
        </ul>
        </div>
        </div>
      </div>
  );
};

export default CourseDetailsPage;
