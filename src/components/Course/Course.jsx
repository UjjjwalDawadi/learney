import React, { useState } from 'react';
import './Course.css';
import { FaRegHeart } from 'react-icons/fa';

function Course({ title, teacher, rating, reviews, price, imageSrc }) {
  const [isHovered, setIsHovered] = useState(false);

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
        <img src={imageSrc} alt={title} className="course-image" />
        <div className="course-details">
          <h2>{title}</h2>
          <h3>{teacher}</h3>
          <p>
            {rating} ★ ({reviews})
          </p>
          <p>${price}</p>
        </div>
        <div className="course-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="wishlist-btn">
            <FaRegHeart />
          </button>
        </div>
      </div>
      <div className="description-dialog">
        <p>Course Description Goes Here</p>
      </div>
    </div>
  );
}

export default Course;
