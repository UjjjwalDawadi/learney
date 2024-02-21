import React from 'react';
import './Body.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import homeImage from '../../resources/Images/Home.png';

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
        Choose from a diverse range of courses tailored <br/>  to meet your learning goals 
        </p>
        <button className="button start" onClick={handleExploreCourses}>Explore Courses
        <FaArrowRight style={{ marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle' }} />
        </button>
      </div>
      <div className="image-container">
        <div className="image" >
        <img src={homeImage} alt="Home" />
        </div>
      </div>
    </div>
  );
};

export default BodySection;
