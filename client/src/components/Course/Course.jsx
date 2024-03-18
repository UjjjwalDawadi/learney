import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios'; // Import Axios

import './Course.css';

function Course({ title, price, courseDuration, uploadedBy, thumbnailPath, courseId }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const rating = 4.5;
  const review = 500;
  const userRole = localStorage.getItem('userRole');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWishlistClick = async () => {
    try {
      const response = await axios.post('/api/bookmarks', {
        userId: localStorage.getItem('userId'), 
        courseId: courseId
        
      });
      console.log('response' ,response);
      if (response.status === 201) {
        setIsBookmarked(!isBookmarked);
        
      } else {
        console.error('Bookmark creation failed:', response.statusText);
      }
    } catch (error) {
      console.error('Bookmark  failed:', error.message);
    }
  };

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {userRole === 'Student' && (
        <button className="wishlist-btn" onClick={handleWishlistClick}>
          <span title='Bookmark'>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</span>
        </button>
      )}
      <div className="course-card-inner">
        <img src={thumbnailPath} alt='' className="course-image" onClick={() => navigate(`/courses/${courseId}`)} />
        <div className="course-details">
          <h2>{title}</h2>
          <div style={{ display: 'flex' }}>
            <p style={{ color: '#ff4a12' }}>
              {rating}<span style={{ color: '#ff9413', fontSize: '19px' }}> ★ </span>
              <span style={{ color: '#ff6811b2', fontSize: '19px' }}>({review})</span>
            </p>
            <p ><SiTimescale style={{ fontSize: '19px', verticalAlign: 'middle', marginLeft: '5px', marginRight: '5px' }} />{courseDuration} </p>
          </div>
          <p>{price === '0.00' ? "Free" : `$${price}`}</p>
          <p>Uploaded by: {uploadedBy}</p>
        </div>
        {userRole === 'Student' && (
          <button className="add-to-cart-btn">Add to Cart</button>
        )}
      </div>
    </div>
  );
}

export default Course;
