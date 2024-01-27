// Courses.jsx

import React, { useState } from 'react';
import Course from './Course';
import './Courses.css';
import Header from '../Home/Header';
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from "react-icons/tb";
import SideBar from './SideBar'; // import the SideBar component

// Import all PNG images from the images folder
const images = require.context('../../resources/Images', false, /\.(png)$/);
const imageFiles = images.keys().map(images);

const courseTypes = ['Programming', 'Design', 'Marketing','Science' ];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const durations = ['Short', 'Medium', 'Long'];
const uploadDates = ['Last 24 hours', 'Last week', 'Last month', 'Last year'];
const teacherNames = ['Ram','Shyam','Hari']

const courses = [
  {
    title: 'Advanced Quantum Physics',
    teacher: 'Dr. Jane Doe',
    rating: 4.8,
    reviews: 350,
    price: 79.99,
    imageSrc: imageFiles[1], // Assuming you have more than one image in the array
    type: 'Science', // Course type
    difficultyLevel: 'Advanced', // Difficulty level
    duration: 'Long', // Duration
    uploadDate: 'Last month', // Upload date
    name: 'Ram' ,
  }
  ,
  {
    title: 'Course 2 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },

  {
    title: 'Course 3 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 4 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 5 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 6 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 7 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 8 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
  {
    title: 'Course 9 Title',
    teacher: 'teacher ',
    rating: 4.7,
    reviews: 120,
    price: 59.99,
    imageSrc: imageFiles[1],
  },
];

function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleRatingChange = (event) => {
    setMinRating(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleTypeChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedTypes(values);
  };
  const handleNameChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedNames(values);
  };
  
  
  const filteredCourses = courses.filter(course =>
    (selectedTypes.length === 0 || selectedTypes.includes(course.type)) &&
    (selectedLevels.length === 0 || selectedLevels.includes(course.level)) &&
    (selectedDurations.length === 0 || selectedDurations.includes(course.duration)) &&
    (selectedNames.length === 0 || selectedNames.includes(course.name)) &&
    (selectedDates.length === 0 || selectedDates.includes(course.uploadDate)) &&
    course.price >= minPrice && course.price <= maxPrice && course.rating >=minRating 
  );

  return (
    <div>
      <Header/>
      <div className="courses-container">
        <SideBar/>
        <SideBar 
          sidebarOpen={sidebarOpen} 
          courseTypes={courseTypes}
          teacherNames={teacherNames}
          difficultyLevels={difficultyLevels}
          durations={durations}
          uploadDates={uploadDates}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedNames={selectedNames}
          setSelectedNames={setSelectedNames}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedDurations={selectedDurations}
          setSelectedDurations={setSelectedDurations}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          handleRatingChange={handleRatingChange} 
          handleMinPriceChange={handleMinPriceChange} 
          handleMaxPriceChange={handleMaxPriceChange} 
          handleTypeChange={handleTypeChange}
          handleNameChange={handleNameChange}
        />

        <button className="arrow "  onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <span title='Hide Sidebar'><TbArrowBadgeLeftFilled /></span> : <span title='Show Sidebar'><TbArrowBadgeRightFilled /></span>}
        </button>

        <div className="courses-list">
        <h1>Available Courses</h1>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <Course key={index} {...course} />
            ))
          ) : (
            <p className="no-courses">No courses found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
