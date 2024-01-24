// Courses.jsx

import React, { useState } from 'react';
import Course from './Course';
import './Courses.css';
import '../../components/Home/Header'
import Header from '../Home/Header';
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from "react-icons/tb";

// Import all PNG images from the images folder
const images = require.context('../../resources/Images', false, /\.(png)$/);
const imageFiles = images.keys().map(images);

const courses = [
  {
    title: 'Course 1 Title',
    teacher: 'teacher ',
    rating: 4.5,
    reviews: 100,
    price: 49.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 2 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },

  {
    title: 'Course 3 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 4 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 5 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 6 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 7 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 8 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 9 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[0],
  },
];

function Courses() {
  const [filter, setFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Header/>
      <div className="courses-container">
        
        {sidebarOpen && (
          <div className="sidebar">
            <h1>Filter Courses</h1>
            <input type="text" placeholder="Search..." onChange={handleFilterChange} />
          </div> 
        )}
        <button className="arrow "  onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <span title='Hide Sidebar'><TbArrowBadgeLeftFilled /></span> : <span title='Show Sidebar'><TbArrowBadgeRightFilled /></span>}
        </button>

        <div className="courses-list">
        <h1>Available Courses</h1>
          {filteredCourses.map((course, index) => (
            <Course key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
