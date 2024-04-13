import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditCourse.css"; // Import CSS file for styling
import Select from "react-select";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaCamera } from "react-icons/fa"; // Import camera icon
import { MdVideoLibrary } from "react-icons/md";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function EditCourseDetails() {
  const [courseDetails, setCourseDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({}); // Form data for editing course details
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const { courseId } = useParams();
  const storage = getStorage();


  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleAlert = (title, message, severity) => {
    setAlertMessage({ title, message });
    setAlertSeverity(severity);
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 4000); // Close the alert after 3 seconds
  };

  const categoryOptions = [
    { value: "default", label: "Choose course category" },
    { value: "Development", label: "Development" },
    { value: "Business", label: "Business" },
    { value: "Finance & Accounting", label: "Finance & Accounting" },
    { value: "IT & Software", label: "IT & Software" },
    { value: "Health & Fitness", label: "Health & Fitness" },
    { value: "Personal Development", label: "Personal Development" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Photography & Video", label: "Photography & Video" },
    { value: "Unknown", label: "I don't know yet" },
  ];
  const difficultyOptions = [
    { value: "default", label: "Choose difficulty level" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "All-Level", label: "All level" },
  ];

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/details`);
      setCourseDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      // Handle error
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (!isLoading) {
      console.log("Initial thumbnail path:", courseDetails.course.thumbnailPath); // Log initial thumbnail path
      setFormData({
        
        title: courseDetails.course.title,
        description: courseDetails.course.description,
        category: courseDetails.course.category,
        difficultyLevel: courseDetails.course.difficultyLevel,
        price: courseDetails.course.price,
        thumbnailPath : courseDetails.course.thumbnailPath,
      });
    }
  }, [isLoading, courseDetails]);
  const uploadImage = async (file) => {
    try {
      const imageStorageRef = ref(storage, `course_images/${file.name}`);
      await uploadBytes(imageStorageRef, file);
      const imageUrl = await getDownloadURL(imageStorageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image.");
    }
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
  
      if (!file) {
        // If no file is selected, retain the existing thumbnailPath
        return;
      }
  
      // Upload the new image
      const imageUrl = await uploadImage(file);
  
      // Update the thumbnailPath in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageInput: file,
        thumbnailPath: imageUrl,
      }));
    } catch (error) {
      console.error("Error handling image file:", error);
      handleAlert('Error', "Error handling image file.", 'error');
    }
  };
  
  
  
  
  
  const handleVideoChange = async (e, sectionIndex, videoIndex) => {
    try {
      const file = e.target.files[0];
      console.log("Selected video file:", file);
  
      if (!file) {
        // If no new file is selected, use the existing video URL
        const updatedSections = [...courseDetails.sections];
        const videoUrl = updatedSections[sectionIndex].videos[videoIndex].url;
        console.log("No new video file selected. Using existing video URL:", videoUrl);
        
        // Update the course details with the existing video URL
        setCourseDetails((prevState) => {
          const newState = [...prevState.sections];
          newState[sectionIndex].videos[videoIndex].url = videoUrl;
          return { ...prevState, sections: newState };
        });
  
        return; // Exit the function since no new file is selected
      }
  
      // If a new file is selected, proceed with uploading it
      const videoUrl = await uploadVideo(file);
  
      // Update the course details with the new video URL
      const updatedSections = [...courseDetails.sections];
      updatedSections[sectionIndex].videos[videoIndex].url = videoUrl;
      setCourseDetails((prevState) => {
        const newState = [...prevState.sections];
        newState[sectionIndex].videos[videoIndex].url = videoUrl;
        return { ...prevState, sections: newState };
      });
  
      console.log("Course details updated with video URL.");
    } catch (error) {
      console.error("Error handling video file:", error);
      handleAlert('Error', "Error handling video file.", 'error');
    }
  };
  
  
  const uploadVideo = async (file) => {
    try {
      const videoStorageRef = ref(storage, `course_videos/${file.name}`);
      console.log("Uploading video to:", videoStorageRef.fullPath); // Log uploading video path
      await uploadBytes(videoStorageRef, file);
      console.log("Video uploaded successfully.");
  
      const videoUrl = await getDownloadURL(videoStorageRef);
      console.log("Download URL:", videoUrl);
  
      return videoUrl;
    } catch (error) {
      console.error("Error uploading video:", error);
      throw new Error("Error uploading video.");
    }
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
      sections: [
        ...courseDetails.sections,
        { title: `Section ${courseDetails.sections.length + 1}`, videos: [] },
      ],
    });
  };

  const handleAddVideo = (sectionIndex) => {
    const updatedSections = [...courseDetails.sections];
    updatedSections[sectionIndex].videos.push({
      title: `Video ${updatedSections[sectionIndex].videos.length + 1}`,
    });
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
    setCourseDetails({
      ...courseDetails,
      learningObjectives: updatedObjectives,
    });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...courseDetails.learnerRequirements];
    updatedRequirements[index].requirements = value;
    setCourseDetails({
      ...courseDetails,
      learnerRequirements: updatedRequirements,
    });
  };

  const handleAddObjective = () => {
    setCourseDetails({
      ...courseDetails,
      learningObjectives: [
        ...courseDetails.learningObjectives,
        { objectives: "" },
      ],
    });
  };

  const handleAddRequirement = () => {
    setCourseDetails({
      ...courseDetails,
      learnerRequirements: [
        ...courseDetails.learnerRequirements,
        { requirements: "" },
      ],
    });
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = [...courseDetails.learningObjectives];
    updatedObjectives.splice(index, 1);
    setCourseDetails({
      ...courseDetails,
      learningObjectives: updatedObjectives,
    });
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...courseDetails.learnerRequirements];
    updatedRequirements.splice(index, 1);
    setCourseDetails({
      ...courseDetails,
      learnerRequirements: updatedRequirements,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: [formData.imageInput] } });

    // Validations
if (!formData.title || formData.title.length > 50) {
  handleAlert('Error', "Title must be between 1 and 50 characters.", 'error');
  return;
}
if (!formData.description || formData.description.length > 150) {
  handleAlert('Error', "Description must be between 1 and 150 characters.", 'error');
  return;
}
if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
  handleAlert('Error', "Price must be a positive number.", 'error');
  return;
}
if (parseFloat(formData.price).toFixed(2).length > 7) {
  handleAlert('Error', "Price can have at most 4 digits before the decimal and 2 digits after the decimal.", 'error');
  return;
}
if (formData.category === 'default') {
  handleAlert('Error', "Please select a category.", 'error');
  return;
}
if (formData.difficultyLevel === 'default') {
  handleAlert('Error', "Please select a difficulty level.", 'error');
  return;
}
if (courseDetails.sections.length === 0) {
  handleAlert('Error', "At least one section is required.", 'error');
  return;
}

for (let i = 0; i < courseDetails.sections.length; i++) {
  const section = courseDetails.sections[i];
  if (!section.title) {
    handleAlert('Error', `Section ${i + 1} title is required.`, 'error');
    return;
  }
  if (section.videos.length === 0) {
    handleAlert('Error', `Section ${i + 1} must have at least one video.`, 'error');
    return;
  }
  for (let j = 0; j < section.videos.length; j++) {
    const video = section.videos[j];
    if (!video.title) {
      handleAlert('Error', `Video ${j + 1} in Section ${i + 1} must have a title.`, 'error');
      return;
    }
    if (!video.url) {
      handleAlert('Error', `Video ${j + 1} in Section ${i + 1} must have a video file.`, 'error');
      return;
    }
  }
}

// Learning Objectives Validation
for (let i = 0; i < courseDetails.learningObjectives.length; i++) {
  const objective = courseDetails.learningObjectives[i];
  if (!objective.objectives.trim()) {
    handleAlert('Error', `Learning Objective ${i + 1} cannot be empty.`, 'error');
    return;
  }
}
if (courseDetails.learningObjectives.length < 2 || courseDetails.learningObjectives.length > 6) {
  handleAlert('Error', "Learning Objectives must be between 2 and 6.", 'error');
  return;
}

// Learner Requirements Validation
for (let i = 0; i < courseDetails.learnerRequirements.length; i++) {
  const requirement = courseDetails.learnerRequirements[i];
  if (!requirement.requirements.trim()) {
    handleAlert('Error', `Learner Requirement ${i + 1} cannot be empty.`, 'error');
    return;
  }
}
if (courseDetails.learnerRequirements.length === 0 || courseDetails.learnerRequirements.length > 4) {
  handleAlert('Error', "Learner Requirements must be between 1 and 4.", 'error');
  return;
}


try {
  // Upload image to Firebase Storage...
  let courseImageUrl = ''; // Define courseImageUrl here

  const imageFile = formData.imageInput;
  if (imageFile && imageFile.name) {
    const storageRef = ref(storage, `course_thumbnails/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    courseImageUrl = await getDownloadURL(storageRef);
  }

  // Upload videos to Firebase Storage
  const updatedSections = await Promise.all(
    courseDetails.sections.map(async (section) => {
      const updatedVideos = await Promise.all(
        section.videos.map(async (video) => {
          const videoFile = video.videoInput;
          if (videoFile && videoFile.name) {
            const videoStorageRef = ref(storage, `course_videos/${videoFile.name}`);
            await uploadBytes(videoStorageRef, videoFile);
            const videoUrl = await getDownloadURL(videoStorageRef);
            return { ...video, url: videoUrl };
          } else {
            // If no new file is selected, use the existing video URL
            return video;
          }
        })
      );
      return { ...section, videos: updatedVideos };
    })
  );

  // Update form data with the uploaded image URL and the updated video URLs
  const updatedFormData = {
    ...formData,
    thumbnailPath: courseImageUrl || formData.thumbnailPath,
    sections: updatedSections,
    learningObjectives: courseDetails.learningObjectives, // Add learningObjectives here
      learnerRequirements: courseDetails.learnerRequirements,
  };
console.log(updatedFormData)
  await axios.put(`/api/courses/${courseId}`, updatedFormData); // Update course details with the new form data
  // Handle success
} catch (error) {
  console.error("Error updating course details:", error);
  handleAlert('Error', "Error updating course details.", 'error');
}
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {alertOpen && (
        <Stack
          sx={{
            width: "auto",
            zIndex: 999,
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          spacing={2}
        >
          <Alert severity={alertSeverity} onClose={handleAlertClose}>
            <strong>{alertMessage.title}</strong>
            <br />
            {alertMessage.message}
          </Alert>
        </Stack>
      )}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="course-dtl-edit">
          <div className="basic-left">
            <h2>Basic Details</h2>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <Select
              id="category"
              name="category"
              value={categoryOptions.find(
                (option) => option.value === formData.category
              )}
              options={categoryOptions}
              onChange={(selectedOption) =>
                setFormData({ ...formData, category: selectedOption.value })
              }
            />

            <label htmlFor="difficultyLevel">Difficulty Level</label>
            <Select
              id="difficultyLevel"
              name="difficultyLevel"
              value={difficultyOptions.find(
                (option) => option.value === formData.difficultyLevel
              )}
              options={difficultyOptions}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  difficultyLevel: selectedOption.value,
                })
              }
            />

            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="thumbnail-container">
            <img
              src={formData.thumbnailPath || courseDetails.course.thumbnailPath}
              alt="Course Thumbnail"
              className="thumbnail-image"
            />
            <label htmlFor="imageInput" className="change-image-btn">
              <FaCamera />
              <span>Change Image</span>
            </label>
            <input
              type="file"
              id="imageInput"
              name="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="course-dtl-edit" style={{ display: "block" }}>
          <h2>Content Details</h2>
          {courseDetails.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section-cntr">
              <div style={{ display: "flex" }} className="section-title">
                <h3>Section {sectionIndex + 1}:</h3>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionTitleChange(sectionIndex, e.target.value)
                  }
                />
                <button
                  onClick={() => handleRemoveSection(sectionIndex)}
                  className="delete-section-btn"
                  title="Delete Section"
                >
                  <MdDelete />
                </button>
              </div>
              {section.videos.map((video, videoIndex) => (
                <div key={videoIndex} style={{ margin: "0 30px" }}>
                  <div style={{ display: "flex" }} className="video-title">
                    <h3>Video {videoIndex + 1}: </h3>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoTitleChange(
                          sectionIndex,
                          videoIndex,
                          e.target.value
                        )
                      }
                    />
                     
                     <label
  htmlFor={`videoInput-${sectionIndex}-${videoIndex}`}
  className="choose-video-btn"
>
  <MdVideoLibrary style={{ marginRight: "10px" }} />{" "}
  {video.url ? "Change file" : "Upload file"}
</label>
<input
  type="file"
  id={`videoInput-${sectionIndex}-${videoIndex}`} // Ensure unique ID
  accept="video/*"
  onChange={(e) => handleVideoChange(e, sectionIndex, videoIndex)} // Pass correct section and video index
  style={{ display: "none" }}
/>

                   
                    <button
                      onClick={() =>
                        handleRemoveVideo(sectionIndex, videoIndex)
                      }
                      className="delete-video-btn"
                      title="Delete Video"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleAddVideo(sectionIndex)}
                style={{ marginLeft: "40px", padding: "6px 12px" }}
              >
                <MdAdd
                  style={{
                    marginRight: "5px",
                    fontSize: "25px",
                    verticalAlign: "middle",
                  }}
                />
                Add Video
              </button>
            </div>
          ))}
          <button
            onClick={handleAddSection}
            style={{ marginTop: "20px", padding: "6px 12px" }}
          >
            <MdAdd
              style={{
                marginRight: "5px",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            />
            Add Section
          </button>
        </div>

        {/* Learning Objectives */}
        <div className="course-dtl-edit" style={{ display: "block" }}>
          <h2>Learning Objectives</h2>
          {courseDetails.learningObjectives.map((objective, index) => (
            <div key={index}>
              <div style={{ display: "flex" }} className="objective-text">
                <h3>Objective {index + 1} </h3>
                <input
                  type="text"
                  value={objective.objectives}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(index)}
                  className="delete-section-btn"
                  title="Delete Objective"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddObjective}
            style={{
              marginTop: "20px",
              padding: "6px 12px",
              marginLeft: "40px",
            }}
          >
            <MdAdd
              style={{
                marginRight: "5px",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            />
            Add Objective
          </button>
        </div>

        {/* Learner Requirements */}
        <div className="course-dtl-edit" style={{ display: "block" }}>
          <h2>Learner Requirements</h2>
          {courseDetails.learnerRequirements.map((requirement, index) => (
            <div key={index}>
              <div style={{ display: "flex" }} className="requirement-text">
                <h3>Requirement {index + 1} </h3>
                <input
                  type="text"
                  value={requirement.requirements}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="delete-section-btn"
                  title="Delete Requirement"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRequirement}
            style={{
              marginTop: "20px",
              padding: "6px 12px",
              marginLeft: "40px",
            }}
          >
            <MdAdd
              style={{
                marginRight: "5px",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            />
            Add Requirement
          </button>
        </div>

        <button
          type="submit"
          className="update-button"
          style={{
            marginBottom: "30px",
            marginLeft: "10px",
            position: "fixed",
            right: "200px",
            bottom: "100px",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCourseDetails;