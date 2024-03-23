import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios'; 

import './Course.css';

function Course({ title, price, courseDuration, uploadedBy, thumbnailPath, courseId }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // Track the bookmark status locally

  const rating = 4.5;
  const review = 500;
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    // Check if the course is bookmarked when the component mounts
    checkIsBookmarked();
  }, []);

  const checkIsBookmarked = async () => {
    try {
      const response = await axios.get(`/api/bookmarks/${courseId}`);
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error.message);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWishlistClick = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (isBookmarked) {
        // If already bookmarked, delete the bookmark
        await axios.delete(`/api/bookmarks/${courseId}`);
      } else {
        await axios.post('/api/bookmarks', {
          courseId: courseId,
          userId: userId
        });
      }
      // Toggle the bookmark status locally
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Bookmark failed:', error.message);
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
          {/* Use isBookmarked state to toggle between bookmark icons */}
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
