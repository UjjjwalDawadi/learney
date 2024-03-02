import React from 'react';
import Select from 'react-select';
import './SideBar.css'

function SideBar({ sidebarOpen, handleRatingChange, handleMinPriceChange, handleMaxPriceChange, handleTypeChange,
                   handleLevelChange, handleDurationChange, handleDateChange,handleNameChange,teacherNames,
                   courseTypes, difficultyLevels, durations, uploadDates })
  {
  return (
    sidebarOpen && (
      <div className="sidebar">
        <h1>Filter Courses</h1>
        <div>
        <label>
          <h2>Rating</h2>
          <input className='rating' type="number" min="0" max="5" step="0.1" onChange={handleRatingChange} placeholder="Min-Rating.." />
        </label>
        <label>
        <h2>Price Range </h2>
          <input className='price-input' type="number" min="0" step="1" onChange={handleMinPriceChange} placeholder="Min.." />
        <h2>To</h2>
          <input className='price-input' type="number" min="0" step="1" onChange={handleMaxPriceChange} placeholder="Max.." />
        </label>
        </div>

        <div>
            <div className='sort-course'>
                <h2>Teacher Name</h2>
                <Select className='dropdown-box'
                    isMulti
                    options={teacherNames.map(name => ({value: name, label: name}))}
                    onChange={handleNameChange}
                />
            </div>
            <div className='sort-course'>
                <h2>Course Type</h2>
                <Select className='dropdown-box'
                    isMulti
                    options={courseTypes.map(type => ({value: type, label: type}))}
                    onChange={handleTypeChange}
                />
            </div>
            <div className='sort-course'>
                <h2>Difficulty Level</h2>
                <Select className='dropdown-box'
                    isMulti
                    options={difficultyLevels.map(level => ({value: level, label: level}))}
                    onChange={handleLevelChange}
                />
            </div>
            <div className='sort-course'>
                <h2>Duration</h2>
                {/* <Select className='dropdown-box'
                    isMulti
                    options={durations.map(duration => ({value: duration, label: duration}))}
                    onChange={handleDurationChange}
                /> */}
            </div>
            <div className='sort-course'>
                <h2>Upload Date</h2>
                <Select className='dropdown-box'
                    isMulti
                    options={uploadDates.map(date => ({value: date, label: date}))}
                    onChange={handleDateChange}
                />
            </div>
        </div>         
      </div> 
    )
  );
}

export default SideBar;
