// Course.jsx

import React from 'react';
import './Course.css'; // Import the CSS file for styling

function Course({ title, instructor, rating, reviews, price, bestseller, imageSrc }) {
  return (
    <div className="course-card">
      <img src={imageSrc} alt={title} className="course-image" />
      <div className="course-details">
        <h2>{title}</h2>
        <h3>{instructor}</h3>
        <p>{rating} ★ ({reviews})</p>
        <p>${price}</p>
        {bestseller && <p className="bestseller-label">Bestseller</p>}
      </div>
    </div>
  );
}

export default Course;
