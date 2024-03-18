import React, { useState } from 'react';
import './BasicInfo.css';

const BasicInfo = ({ nextStep }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [difficultyError, setDifficultyError] = useState(false);

  const categoryOptions = [
    { value: 'default', label: 'Choose course category' },
    { value: 'Development', label: 'Development' },
    { value: 'Business', label: 'Business' },
    { value: 'Finance & Accounting', label: 'Finance & Accounting' },
    { value: 'IT & Software', label: 'IT & Software' },
    { value: 'Health & Fitness', label: 'Health & Fitness' },
    { value: 'Personal Development', label: 'Personal Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Photography & Video', label: 'Photography & Video' },
    { value: 'Unknown', label: "I don't know yet" }
  ];
  const difficultyOptions = [
    { value: 'default', label: 'Choose difficulty level' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'All-Level', label: 'All level' },
  ];

  // Character limit for title and description
  const titleCharLimit = 50;
  const descriptionCharLimit = 150;

  // Function to calculate remaining characters
  const remainingChars = (text, limit) => {
    return limit - text.length;
  };

  // Function to handle form submission and send values to the next step
  const handleSubmit = () => {
    // Resetting previous errors
    setTitleError(false);
    setCategoryError(false);
    setDescriptionError(false);
    setDifficultyError(false);

    // Perform form validation
    if (!title || title.trim() === '') {
      setTitleError(true);
      return;
    }

    if (category === '') {
      setCategoryError(true);
      return;
    }

    if (!description || description.trim() === '') {
      setDescriptionError(true);
      return;
    }

    if (difficulty === '') {
      setDifficultyError(true);
      return;
    }

    // If all validations pass, proceed to the next step
    const formData = {
      title: title,
      category: category,
      difficultyLevel: difficulty,
      description: description
    };
    console.log('Basic Info Data:', formData);
    nextStep(formData);
  };

  return (
    <div className="course-form-container">
      <h1>Basic Information</h1>
      <div className={`add-course ${titleError ? 'error' : ''}`}>
        <h2>Course title</h2>
        <span className="error-msg">{titleError && 'Course title is required'}</span>
        <input
          type="text"
          id="title"
          placeholder="Your course title"
          value={title}
          maxLength={titleCharLimit}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="char-count">{remainingChars(title, titleCharLimit)} characters remaining</span>
      </div>
      <div className={`add-course ${categoryError ? 'error' : ''}`}>
        <h2>Choose a category</h2>
        <span className="error-msg">{categoryError && 'Please choose a category'}</span>

        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className={`add-course ${descriptionError ? 'error' : ''}`}>
        <h2>Short Description </h2>
        <span className="error-msg">{descriptionError && 'Please enter the course description.'}</span>
        <textarea
          className="form-textarea"
          placeholder="Explain what the course is about.."
          value={description}
          maxLength={descriptionCharLimit}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="char-count">{remainingChars(description, descriptionCharLimit)} characters remaining</span>
      </div>
      <div className={`add-course ${difficultyError ? 'error' : ''}`}>
        <h2>Choose difficulty level</h2>
        <span className="error-msg">{difficultyError && 'Please choose a difficulty level.'}</span>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficultyOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <button className="add-course-btn" onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default BasicInfo;
