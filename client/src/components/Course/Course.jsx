import React, { useState } from 'react';
import './Course.css';
import { FaRegHeart } from 'react-icons/fa';

function Course({ title,price,duration}) {

  const [isHovered, setIsHovered] = useState(false);
  const rating = 4.5;
  
  const userRole = localStorage.getItem('userRole');
  


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="course-card-inner">
        {/* <img src={imageSrc} alt='' className="course-image" /> */}
        <div className="course-details">
          <h2>{title}</h2>
          <p>
            {rating}<span style={{ color: '#ff9413', fontSize: '19px' }}> ★ </span>[{duration}]
          </p>
          <p>${price}</p>
        </div>
        {userRole === 'Student' && (
          <div className="course-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">
              <span title='Add to wishlist'><FaRegHeart /></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
