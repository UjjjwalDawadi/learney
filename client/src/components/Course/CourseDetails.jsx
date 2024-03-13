import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-container">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <h1>{courseDetails.course.title}</h1>
          <p>{courseDetails.course.description}</p>
        </div>
      </div>
      {/* Introduction Video Section */}
      <div className="intro-video">
        <video src={courseDetails.introVideoUrl} controls />
      </div>
      {/* Course Content Section */}
      <div className="course-content">
        {/* Sections and Videos */}
        <div className="sections">
          <h2>Table of Contents</h2>
          {courseDetails.sections.map((section, index) => (
            <div key={index} className="section">
              <h3>{section.title}</h3>
              <ul>
                {section.videos.map((video, index) => (
                  <li key={index}>
                    <video src={video.url} controls />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Learning Objectives and Learners Requirements */}
        <div className="objectives-requirements">
          <h2>Learning Objectives</h2>
          <ul>
            {courseDetails.learningObjectives.map((objective, index) => (
              <li key={index}>{objective.objectives}</li>
            ))}
          </ul>
          <h2>Learner Requirements</h2>
          <ul>
            {courseDetails.learnerRequirements.map((requirement, index) => (
              <li key={index}>{requirement.requirements}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
