import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Pricing = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const storage = getStorage();

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, ''); // Limit to numeric characters and dot
    const parts = value.split('.');
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 2); // Limit to 2 decimal places
      value = parts[0].slice(0, 3) + '.' + parts[1];
    } else {
      value = value.slice(0, 3);
    }
    setPrice(value);
  };

  const handleSubmit = async () => {
    // Get course image from form data
    const courseImage = formData.imageFile;

    // Upload course image to Firebase Storage
    let courseImageUrl = '';
    if (courseImage.name) {
      console.log('image is',courseImage);
      const storageRef = ref(storage, `course_thumbnails/${courseImage.name}`);
      await uploadBytes(storageRef, courseImage);
      courseImageUrl = await getDownloadURL(storageRef);
    }
    const updatedSections = formData.sections.map(async (section) => {
      // Iterate through each section
      const videos = section.videos || [];
      const updatedVideos = await Promise.all(videos.map(async (video) => {
        // Iterate through each video in the section
        const videoFile = video.file;
        console.log('Processing video:', videoFile); // Log the video file being processed
        let videoUrl = '';
        if (videoFile && videoFile.name) {
          console.log('Uploading video:', videoFile.name); // Log before uploading video
          const videoStorageRef = ref(storage, `course_videos/${videoFile.name}`);
          await uploadBytes(videoStorageRef, videoFile);
          videoUrl = await getDownloadURL(videoStorageRef);
          console.log('Video uploaded successfully. URL:', videoUrl); // Log after uploading video
        } else {
          throw new Error("Video file is missing or invalid.");
        }
        // Check if videoUrl is an array or an object
    if (Array.isArray(videoUrl)) {
      // If videoUrl is an array, extract the URL from it
      videoUrl = videoUrl[0]; // Adjust this line based on the structure of the array
    } else if (typeof videoUrl === 'object' && videoUrl !== null) {
      // If videoUrl is an object, extract the URL from it
      videoUrl = videoUrl.url; // Adjust this line based on the structure of the object
    }
    
    // Ensure that videoUrl is a string
    videoUrl = String(videoUrl);
        return { ...video, url: videoUrl }; // Update the video object with the video URL
      }));
      // Update the section with the updated videos
      return { ...section, videos: updatedVideos };
    });
  
  // Wait for all section updates to complete
  const updatedFormData = { ...formData, price: price, thumbnailPath: courseImageUrl, sections: await Promise.all(updatedSections) };
  setFormData(updatedFormData);
  // Proceed with storing updatedFormData in your database
    
    try {
      // Send form data to the backend
      const response = await fetch('/api/add-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
  
      console.log('successfully added course');
      navigate('/courses');
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error accordingly, e.g., display an error message to the user
    }
  };
  const makeFree = () => {
    setPrice('0');
  };

  const isFree = parseFloat(price) === 0;

  return (
    <div className="course-form-container">
      <h1>Pricing</h1>
      <div className="add-course">
        <h2>Set Price</h2>
        <div>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            style={{ width: '200px' }}
          />
          <button onClick={makeFree} style={{ marginLeft: '20px', height: '45px', width: '130px', backgroundColor: '#1c1a4a', color: '#fff', fontSize: '16px', fontWeight: '500' }}>Make it Free</button>
        </div>
        <div style={{ fontSize: '20px' }}>
          {price === '' ? null : (isFree ? <p>Your course is priced: <span style={{ color: 'green', fontWeight: '600' }}>Free</span></p> : <p>Your course is priced: <span style={{ color: 'green', fontWeight: '600' }}>${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>)}
        </div>
      </div>
      <button className='add-course-btn' onClick={handleSubmit} style={{ width: '200px', fontSize: '18px' }}>Submit for Review</button>
    </div>
  );
};

export default Pricing;
