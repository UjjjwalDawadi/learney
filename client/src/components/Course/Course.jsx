import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios';

import './Course.css';

function Course({ title, price, courseDuration, uploadedBy, thumbnailPath, courseId, isAlreadyInCart, displayButtons }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const rating = 4.5;
  const review = 700;

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
        await axios.delete(`/api/bookmarks/${courseId}`);
      } else {
        await axios.post('/api/bookmarks', { courseId, userId });
      }
      setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
    } catch (error) {
      console.error('Bookmark failed:', error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!isAlreadyInCart) {
        navigate('../dashboard/cart')
      } else {
        // Add to cart
        await axios.post('/api/cart', { userId, courseId });
      }
      // Update the state or trigger a re-fetch of cart information
    } catch (error) {
      console.error('Error updating cart:', error.message);
    }
  };

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {userRole === 'Student' && !displayButtons && (
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
        {userRole === 'Student' && !displayButtons && (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            {!isAlreadyInCart ? 'View in Cart' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Course;
