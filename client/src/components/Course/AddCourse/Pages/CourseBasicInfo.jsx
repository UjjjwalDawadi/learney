import React, { useState } from 'react';
import './CourseBasicInfo.css'

const BasicInfo = ({ nextStep }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');


  const categoryOptions = [
    { value: 'default', label: 'Choose a category' },
    { value: '1', label: 'Development' },
    { value: '2', label: 'Business' },
    { value: '3', label: 'Finance & Accounting' },
    { value: '4', label: 'IT & Software' },
    { value: '5', label: 'Health & Fitness' },
    { value: '6', label: 'Personal Development' },
    { value: '7', label: 'Design' },
    { value: '8', label: 'Marketing' },
    { value: '9', label: 'Lifestyle' },
    { value: '10', label: 'Photography & Video' },
    { value: '-1', label: "I don't know yet" }
  ];
  const difficultyOptions = [
    { value: 'default', label: 'Choose difficulty level' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'allLevel', label: 'All level' },
  ];

  // Character limit for title and description
  const titleCharLimit = 50; 
  const descriptionCharLimit = 150; 

  // Function to calculate remaining characters
  const remainingChars = (text, limit) => {
    return limit - text.length;
  };

  return (
    <div className="course-form-container">
      <h1>Basic Information</h1>
      <div className='add-course'> 
        <h2>Course title</h2>
        <input 
          type="text" 
          id="title" 
          placeholder='Your course title' 
          value={title} 
          maxLength={titleCharLimit} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <span className="char-count">{remainingChars(title, titleCharLimit)} characters remaining</span>
      </div>
      <div className='add-course'>
        <h2>Choose a category</h2>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="add-course">
        <h2>Short Description </h2>
        <textarea
          className="form-textarea" 
          placeholder='Explain what the course is about..' 
          value={description} 
          maxLength={descriptionCharLimit} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="char-count">{remainingChars(description, descriptionCharLimit)} characters remaining</span>
      </div>
      <div className='add-course'>
        <h2>Choose difficulty level</h2>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficultyOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <button className='add-course-btn' onClick={() =>nextStep()}>Next</button>
    </div>
  );
};

export default BasicInfo;
