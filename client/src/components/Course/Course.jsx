import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";

import './Course.css';
import { FaRegBookmark,FaBookmark } from 'react-icons/fa';

function Course({ title,price,duration,thumbnailPath}) {
  // const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const rating = 4.5;
  const review = 500;
  
  const userRole = localStorage.getItem('userRole');

  // const handleCourseClick = () => {
  //   navigate(`/video-player/${filePath}`);
  // };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleWishlistClick = () => {
    setIsBookmarked(!isBookmarked);
  };


  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="course-card-inner">
      {userRole === 'Student' && (
      <button className="wishlist-btn" onClick={handleWishlistClick}>
      <span title='Add to wishlist'>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</span>
    </button>)}
        <img src={thumbnailPath} alt='' className="course-image"  />
        <div className="course-details">
          <h2>{title}</h2>
          <div style={{display:'flex'}}>
          <p style={{ color: '#ff4a12'}}>
            {rating}<span style={{ color: '#ff9413', fontSize: '19px' }}> ★ </span>
            <span style={{ color: '#ff6811b2', fontSize: '19px' }}>({review})</span>
          </p>
          <p ><SiTimescale style={{ fontSize: '19px' ,verticalAlign: 'middle', marginLeft:'30px', marginRight:'5px'}}/>{duration} hr</p>
          </div>
          <p>${price}</p>
        </div>
        {userRole === 'Student' && (
            <button className="add-to-cart-btn">Add to Cart</button>
        )}
      </div>
    </div>
  );
}
export default Course;
