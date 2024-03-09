import React, { useState } from 'react';
import CourseSidebar from './CourseSidebar';
import BasicInfo from './Pages/CourseBasicInfo';
import IntendedUser from './Pages/CourseIntendedUser';
import CourseContent from './Pages/CourseContents';
import Pricing from './Pages/CoursePricing';

import './CourseCreationPage.css'

const CourseCreationPage = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const nextStep = () => {
    // Logic to handle navigation to the next step
    // For example, you can change the activeTab state
    // to move to the next tab/page
    if (activeTab === 'basicInfo') {
      setActiveTab('intendedUser');
    } else if (activeTab === 'intendedUser') {
      setActiveTab('courseContent');
    } else if (activeTab === 'courseContent') {
      setActiveTab('pricing');
    }
    // You can add more logic as needed for navigating to other steps
  };

  // Render the form based on the active tab
  let formComponent;
  switch (activeTab) {
    case 'basicInfo':
      formComponent = <BasicInfo nextStep={nextStep} />;
      break;
    case 'intendedUser':
      formComponent = <IntendedUser nextStep={nextStep} />;
      break;
    case 'courseContent':
      formComponent = <CourseContent nextStep={nextStep} />;
      break;
    case 'pricing':
      formComponent = <Pricing nextStep={nextStep} />;
      break;
    default:
      formComponent = <BasicInfo nextStep={nextStep} />;
      break;
  }

  return (
    <div className="course-creation-page">
      <CourseSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {formComponent}
    </div>
  );
};

export default CourseCreationPage;
