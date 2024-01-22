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
    instructor: 'Instructor 1',
    rating: 4.5,
    reviews: 100,
    price: 49.99,
    bestseller: true,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 2 Title',
    instructor: 'Instructor 2',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },

  {
    title: 'Course 3 Title',
    instructor: 'Instructor 3',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 4 Title',
    instructor: 'Instructor 4',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 5 Title',
    instructor: 'Instructor 5',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 6 Title',
    instructor: 'Instructor 6',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 7 Title',
    instructor: 'Instructor 7',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 8 Title',
    instructor: 'Instructor 8',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
  {
    title: 'Course 9 Title',
    instructor: 'Instructor 9',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    bestseller: false,
    imageSrc: imageFiles[0],
  },
];

function Courses() {
  return (
    <div>
      <Header/>
    <div className="courses-container">
      <h1>Learners are viewing</h1>
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
