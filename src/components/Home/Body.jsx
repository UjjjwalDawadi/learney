import React from 'react';
import './Body.css';
import { useNavigate } from 'react-router-dom';
import Video from '../../resources/Home.mp4'
import { FaArrowRight } from "react-icons/fa6";

const BodySection = () => {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    // Navigate to the Courses page
    navigate('/courses');
  };
  return (
    <div className="body-section">
      <div className="content">
        <h1 className="title">A broad selection of courses</h1>
        <p className="subtitle">
        Choose from a diverse range of courses tailored to meet your learning goals 
        </p>
        <button className="button start" onClick={handleExploreCourses}>Explore courses
        <FaArrowRight style={{ marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle' }} />
        </button>
      </div>
      <div className="video-container">
        <video className="video" autoPlay loop muted>
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default BodySection;
