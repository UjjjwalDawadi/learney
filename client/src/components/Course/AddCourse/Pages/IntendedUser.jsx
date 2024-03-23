import React, { useState } from 'react';
import { MdDeleteForever, MdAdd } from "react-icons/md";
import './IntendedUser.css';

const IntendedUser = ({ nextStep }) => {
  const initialObjectives = ['', '']; // Initialize learning objectives with two empty fields
  const [learningObjectives, setLearningObjectives] = useState(initialObjectives);
  const [learningObjectivesError, setLearningObjectivesError] = useState('');
  const initialRequirements = ['']; // Initialize learner requirements with one empty field
  const [learnerRequirements, setLearnerRequirements] = useState(initialRequirements);
  const [learnerRequirementsError, setLearnerRequirementsError] = useState('');

  const handleAddObjective = () => {
    if (learningObjectives.length < 6) {
      setLearningObjectives([...learningObjectives, '']);
    }
  };

  const handleRemoveObjective = index => {
    const updatedObjectives = [...learningObjectives];
    updatedObjectives.splice(index, 1);
    setLearningObjectives(updatedObjectives);
  };

  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...learningObjectives];
    updatedObjectives[index] = value;
    setLearningObjectives(updatedObjectives);
  };

  const handleAddRequirement = () => {
    if (learnerRequirements.length < 4) {
      setLearnerRequirements([...learnerRequirements, '']);
    }
  };

  const handleRemoveRequirement = index => {
    const updatedRequirements = [...learnerRequirements];
    updatedRequirements.splice(index, 1);
    setLearnerRequirements(updatedRequirements);
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...learnerRequirements];
    updatedRequirements[index] = value;
    setLearnerRequirements(updatedRequirements);
  };

  // Function to handle form submission and log the data
  const handleSubmit = () => {
    // Validate learning objectives
    if (learningObjectives.length < 2 || learningObjectives.some(objective => objective.trim() === '')) {
      setLearningObjectivesError('Please fill at least two objectives');
      return;
    } else {
      setLearningObjectivesError('');
    }
  
    // Validate learner requirements
    if (learnerRequirements.length < 1 || learnerRequirements.some(requirement => requirement.trim() === '')) {
      setLearnerRequirementsError('Please fill at least one requirement');
      return;
    } else {
      setLearnerRequirementsError('');
    }
  
    // If all validations pass, proceed to the next step
    const formData = {
      learningObjectives,
      learnerRequirements,
    };
    console.log('Intended User Data:', formData);
    nextStep(formData); // Pass the data to the next step
  };
  
  

  return (
    <div className="course-form-container">
      <h1>Intended Users</h1>
      <div className="add-course">
        <h2>Learning Objectives</h2>
        <span className="error-msg">{learningObjectivesError}</span>

        {learningObjectives.map((objective, index) => (
          <div className='input-row' key={index}>
            <input
              type="text"
              placeholder='What will the learner learn?'
              value={objective}
              onChange={e => handleObjectiveChange(index, e.target.value)}
            />
            {index === learningObjectives.length - 1 && index < 5 && (
              <button className='add-field' onClick={handleAddObjective}><MdAdd/></button>
            )}
            {index > 1 && (
              <button className='delete-field' onClick={() => handleRemoveObjective(index)}><MdDeleteForever/></button>
            )}
          </div>
        ))}
      </div>
      <div className="add-course">
        <h2>Learner Requirements</h2>
        <span className="error-msg">{learnerRequirementsError}</span>
        {learnerRequirements.map((requirement, index) => (
          <div className='input-row' key={index}>
            <input
              type="text"
              placeholder='What are the learner requirements?'
              value={requirement}
              onChange={e => handleRequirementChange(index, e.target.value)}
            />
            {index === learnerRequirements.length - 1 && index < 3 && (
              <button className='add-field' onClick={handleAddRequirement}><MdAdd/></button>
            )}
            {index > 0 && (
              <button className='delete-field' onClick={() => handleRemoveRequirement(index)}><MdDeleteForever/></button>
            )}
          </div>
        ))}
      </div>
      <button className='add-course-btn' onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default IntendedUser;
