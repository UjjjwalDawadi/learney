import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditCourse.css'; // Import CSS file for styling
import Select from 'react-select';
import { MdDelete, MdAdd } from "react-icons/md";
import { FaCamera } from 'react-icons/fa'; // Import camera icon
import { MdVideoLibrary } from 'react-icons/md';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




function EditCourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({}); // Form data for editing course details
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const { courseId } = useParams();

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleAlert = (title, message, severity) => {
    setAlertMessage({ title, message });
    setAlertSeverity(severity);
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 300000); // Close the alert after 3 seconds
  };

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

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/details`); // Fetch course details
      setCourseDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course details:', error);
      // Handle error
    }
  }, [courseId]);

  useEffect(() => {
    
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        title: courseDetails.course.title,
        description: courseDetails.course.description,
        category: courseDetails.course.category,
        difficultyLevel: courseDetails.course.difficultyLevel,
        price: courseDetails.course.price,
      });
    }
  }, [isLoading, courseDetails]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, thumbnailPath: event.target.result });
    };
    reader.readAsDataURL(file);
  };
  const handleVideoChange = (e, sectionIndex, videoIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const updatedSections = [...courseDetails.sections];
      updatedSections[sectionIndex].videos[videoIndex].videoPath = event.target.result;
      setCourseDetails({ ...courseDetails, sections: updatedSections });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSectionTitleChange = (index, value) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections[index].title = value;
    setCourseDetails({ ...courseDetails, sections: updatedSections });
  };

  const handleVideoTitleChange = (sectionIndex, videoIndex, value) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections[sectionIndex].videos[videoIndex].title = value;
    setCourseDetails({ ...courseDetails, sections: updatedSections });
  };

  const handleAddSection = () => {
    setCourseDetails({
      ...courseDetails,
      sections: [...courseDetails.sections, { title: `Section ${courseDetails.sections.length + 1}`, videos: [] }]
    });
  };

  const handleAddVideo = (sectionIndex) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections[sectionIndex].videos.push({ title: `Video ${updatedSections[sectionIndex].videos.length + 1}` });
    setCourseDetails({ ...courseDetails, sections: updatedSections });
  };
  const handleRemoveSection = (index) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections.splice(index, 1);
    setCourseDetails({ ...courseDetails, sections: updatedSections });
  };

  const handleRemoveVideo = (sectionIndex, videoIndex) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections[sectionIndex].videos.splice(videoIndex, 1);
    setCourseDetails({ ...courseDetails, sections: updatedSections });
  };
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...courseDetails.learningObjectives];
    updatedObjectives[index].objectives = value;
    setCourseDetails({ ...courseDetails, learningObjectives: updatedObjectives });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...courseDetails.learnerRequirements];
    updatedRequirements[index].requirements = value;
    setCourseDetails({ ...courseDetails, learnerRequirements: updatedRequirements });
  };

  const handleAddObjective = () => {
    setCourseDetails({
      ...courseDetails,
      learningObjectives: [...courseDetails.learningObjectives, { objectives: '' }]
    });
  };

  const handleAddRequirement = () => {
    setCourseDetails({
      ...courseDetails,
      learnerRequirements: [...courseDetails.learnerRequirements, { requirements: '' }]
    });
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = [...courseDetails.learningObjectives];
    updatedObjectives.splice(index, 1);
    setCourseDetails({ ...courseDetails, learningObjectives: updatedObjectives });
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...courseDetails.learnerRequirements];
    updatedRequirements.splice(index, 1);
    setCourseDetails({ ...courseDetails, learnerRequirements: updatedRequirements });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      handleAlert("Error", "There was an error updating the course details.", 'error');

      return;
    }
    if (formData.title.length > 50) {
      handleAlert("Title must be less than 50 characters.", 'error');
      return;
    }
    try {
      await axios.put(`/api/courses/${courseId}`, formData); // Update course details
      // Handle success
    } catch (error) {
      console.error('Error updating course details:', error);
      // Handle error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
         {alertOpen && (
        <Stack sx={{ width: 'auto', zIndex: 999, position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)' }} spacing={2}>
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <strong>{alertMessage.title}</strong><br />{alertMessage.message}
          </Alert>
        </Stack>
      )}
      
      <form onSubmit={handleSubmit} className='edit-form' >
        <div className='course-dtl-edit'>
          <div className="basic-left">
          <h2>Basic Details</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} />

          <label htmlFor="category">Category</label>
            <Select
            id="category"
            name="category"
            value={categoryOptions.find(option => option.value === formData.category)}
            options={categoryOptions}
            onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption.value })}
          />
        
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <Select
            id="difficultyLevel"
            name="difficultyLevel"
            value={difficultyOptions.find(option => option.value === formData.difficultyLevel)}
            options={difficultyOptions}
            onChange={(selectedOption) => setFormData({ ...formData, difficultyLevel: selectedOption.value })}
          />
        
          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
          <div className="thumbnail-container">
          <img src={formData.thumbnailPath || courseDetails.course.thumbnailPath} alt="Course Thumbnail" className="thumbnail-image" />
            <label htmlFor="imageInput" className="change-image-btn">
              <FaCamera />
              <span>Change Image</span>
            </label>
            <input type="file" id="imageInput" name="imageInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </div>
    </div>
    <div className="course-dtl-edit" style={{ display: 'block' }}>
  <h2>Content Details</h2>
  {courseDetails.sections.map((section, sectionIndex) => (
    <div key={sectionIndex} className='section-cntr'>
      <div style={{ display: 'flex' }} className='section-title'>
        <h3>Section {sectionIndex + 1}:</h3>
        <input type="text" value={section.title} onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)} />
        <button onClick={() => handleRemoveSection(sectionIndex)} className='delete-section-btn' title='Delete Section'><MdDelete /></button>
      </div>
      {section.videos.map((video, videoIndex) => (
        <div key={videoIndex} style={{margin:'0 30px'}}>
          <div style={{ display: 'flex' }} className='video-title'>
            <h3>Video {videoIndex + 1}:  </h3>
            <input type="text" value={video.title} onChange={(e) => handleVideoTitleChange(sectionIndex, videoIndex, e.target.value)} />
            {!video.videoPath && (
              <>
                <label htmlFor={`videoInput-${sectionIndex}-${videoIndex}`} className="choose-video-btn">
                  <MdVideoLibrary style = {{marginRight:'10px'}}/> Upload file
                </label>
                <input type="file" id={`videoInput-${sectionIndex}-${videoIndex}`} accept="video/*" onChange={(e) => handleVideoChange(e, sectionIndex, videoIndex)} style={{ display: 'none' }} />
              </>
            )}
            <button onClick={() => handleRemoveVideo(sectionIndex, videoIndex)} className='delete-video-btn' title='Delete Video'><MdDelete /></button>
          </div>
        </div>
      ))}
      <button onClick={() => handleAddVideo(sectionIndex)} style={{ marginLeft: '40px', padding: '6px 12px' }}><MdAdd style={{ marginRight: '5px', fontSize: '25px', verticalAlign: 'middle' }} />Add Video</button>
    </div>
  ))}
  <button onClick={handleAddSection} style={{ marginTop: '20px', padding: '6px 12px' }}><MdAdd style={{ marginRight: '5px', fontSize: '25px', verticalAlign: 'middle' }} />Add Section</button>
</div>


     


        {/* Learning Objectives */}
        <div className="course-dtl-edit" style={{display:'block'}}>
          <h2>Learning Objectives</h2>
          {courseDetails.learningObjectives.map((objective, index) => (
            <div key={index}>
                <div style={{display:'flex'}} className='objective-text'>
              <h3>Objective {index+1} </h3>
              <input type="text" value={objective.objectives} onChange={(e) => handleObjectiveChange(index, e.target.value)} />
              <button type="button" onClick={() => handleRemoveObjective(index)} className='delete-section-btn' title='Delete Objective'><MdDelete/></button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddObjective}style={{marginTop:'20px',padding:'6px 12px',marginLeft:'40px'}}><MdAdd style={{marginRight:'5px',fontSize:'25px', verticalAlign:'middle'}}/>Add Objective</button>
        </div>

        {/* Learner Requirements */}
        <div className="course-dtl-edit" style={{display:'block'}}>
          <h2>Learner Requirements</h2>
          {courseDetails.learnerRequirements.map((requirement, index) => (
            <div key={index}>
              <div style={{display:'flex'}} className='requirement-text'>
              <h3>Requirement {index+1} </h3>
              <input type="text" value={requirement.requirements} onChange={(e) => handleRequirementChange(index, e.target.value)} />
              <button type="button" onClick={() => handleRemoveRequirement(index)} className='delete-section-btn' title='Delete Requirement'><MdDelete/></button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddRequirement}style={{marginTop:'20px',padding:'6px 12px',marginLeft:'40px'}}><MdAdd style={{marginRight:'5px',fontSize:'25px', verticalAlign:'middle'}}/>Add Requirement</button>
        </div>

        <button type="submit" className='update-button' style={{marginBottom:'30px', marginLeft:'10px'}}>Save Changes</button>
      </form>
    </div>
  );
}

export default EditCourseDetails;
