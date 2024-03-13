import React, { useState } from 'react';
import CourseSidebar from './CourseSidebar';
import BasicInfo from './Pages/BasicInfo';
import IntendedUser from './Pages/IntendedUser';
import CourseContent from './Pages/Contents';
import Pricing from './Pages/Pricing';

const CourseCreationPage = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [formData, setFormData] = useState({});

  const nextStep = (data) => {
    setFormData({ ...formData, ...data });

    if (activeTab === 'basicInfo') {
      setActiveTab('intendedUser');
    } else if (activeTab === 'intendedUser') {
      setActiveTab('courseContent');
    } else if (activeTab === 'courseContent') {
      setActiveTab('pricing');
    }
  };

  const handleFinalSubmit = (data) => {
    setFormData({ ...formData, ...data });

    // Now formData contains all the data from all steps
    console.log('All form data:', formData);
    // Handle final submission logic here
  };

  let formComponent;
  switch (activeTab) {
    case 'basicInfo':
      formComponent = <BasicInfo nextStep={nextStep} />;
      break;
    case 'intendedUser':
      formComponent = <IntendedUser nextStep={nextStep} />;
      break;
    case 'courseContent':
      formComponent = <CourseContent nextStep={nextStep} /> ;
      break;
    case 'pricing':
      formComponent = <Pricing formData={formData} setFormData={setFormData} nextStep={handleFinalSubmit} />;
      break;
    default:
      formComponent = <BasicInfo nextStep={nextStep} />;
      break;
  }
  console.log('Final Form Data:', formData);

  return (
    <div className="course-creation-page" style={{display:'flex'}}>
      <CourseSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {formComponent}
    </div>
  );
};

export default CourseCreationPage;
