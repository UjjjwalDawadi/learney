// Courses.jsx

import React from 'react';
import Course from './Course';
import './Courses.css';
import '../../components/Home/Header'
import Header from '../Home/Header';

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
  return (
    <div>
      <Header/>
    <div className="courses-container">
      <h1>Available Courses</h1>
      <div className="courses-list">
        {courses.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Courses;
