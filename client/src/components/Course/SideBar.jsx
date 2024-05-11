import React, { useState } from 'react';
import Select from 'react-select'
import './SideBar.css'

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const uploadDates = ['Last 24 hours', 'Last week', 'Last month', 'Last year'];

function SideBar({ sidebarOpen, courses, setFilteredCourses }) {
  const [filters, setFilters] = useState({
    minRating: '',
    minPrice: '',
    maxPrice: '',
    maxDuration: '',
    difficultyLevels: [],
    uploadDates: []
  });

  const handleFilter = () => {
    const filteredCourses = courses.filter((course) => {
      return (
        (filters.minRating === '' || course.rating >= parseFloat(filters.minRating)) &&
        (filters.minPrice === '' || course.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' || course.price <= parseFloat(filters.maxPrice)) &&
        (filters.maxDuration === '' || course.duration <= parseFloat(filters.maxDuration)) &&
        (filters.difficultyLevels.length === 0 || filters.difficultyLevels.includes(course.difficultyLevel)) &&
        (filters.uploadDates.length === 0 || filters.uploadDates.includes(course.uploadDate))
      );
    });
    setFilteredCourses(filteredCourses);
  };

  const handleReset = () => {
    setFilters({
      minRating: '',
      minPrice: '',
      maxPrice: '',
      maxDuration: '',
      difficultyLevels: [],
      uploadDates: []
    });
    setFilteredCourses(null); // Reset filteredCourses to null
  };

  return (
    sidebarOpen && (
      <div className="sidebar">
        <h1 style={{ textAlign: 'center' }}>Filter Courses</h1>
        <div>
          <label>
            <h2>Min Rating</h2>
            <input
              className='rating'
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              placeholder="Min-Rating.."
            />
          </label>
          <label>
            <h2>Price Range </h2>
            <input
              className='price-input'
              type="number"
              min="0"
              step="1"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              placeholder="Min.."
            />
            <h2>To</h2>
            <input
              className='price-input'
              type="number"
              min="0"
              step="1"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              placeholder="Max.."
            />
          </label>
          <label>
            <h2>Max Duration</h2>
            <input
              className='rating'
              type="number"
              min="1"
              step="1"
              value={filters.maxDuration}
              onChange={(e) => setFilters({ ...filters, maxDuration: e.target.value })}
              placeholder="In-hours.."
            />
          </label>
  <label>
    <h2>Difficulty Level</h2>
    <Select
      className='dropdown-box'
      options={difficultyLevels.map(level => ({ value: level, label: level }))}
      value={filters.difficultyLevels}
      onChange={(selectedOptions) => setFilters({ ...filters, difficultyLevels: selectedOptions })}
    />
  </label>
  <label>
    <h2>Upload Date</h2>
    <Select
      className='dropdown-box'
      options={uploadDates.map(date => ({ value: date, label: date }))}
      value={filters.uploadDates}
      onChange={(selectedOptions) => setFilters({ ...filters, uploadDates: selectedOptions })}
    />
  </label>
  </div>
  <div className="filter-buttons">
        <button className="filter-button" onClick={handleFilter}>Apply Filters</button>
        <button className="filter-button" onClick={handleReset}>Reset Filters</button>
        </div>
      </div>
    )
  );
}

export default SideBar;
