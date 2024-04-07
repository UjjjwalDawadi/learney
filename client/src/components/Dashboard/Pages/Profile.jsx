import React, { useEffect, useState, useRef } from 'react';
import './Profile.css'; // Import CSS file for styling
import axios from 'axios';
import { BsDashLg } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase storage functions

function UserDetails({ userData }) {
  return (
    <div className="user-details-container">
      <p><span className="details-label">Full Name:</span> {userData.fullName}</p>
      <p><span className="details-label">Username:</span> {userData.username}</p>
      <p><span className="details-label">Role:</span> {userData.role}</p>
      <p><span className="details-label">Email:</span> {userData.email}</p>
      <p><span className="details-label">Contact:</span> {userData.contact || <BsDashLg style={{ marginLeft: '1%' }} />}</p>
      <p><span className="details-label">Address:</span> {userData.address || <BsDashLg style={{ marginLeft: '1%' }} />}</p>
    </div>
  );
}

function EditDetails({ userData, updatedUserData, setUpdatedUserData, handleInputChange, handleSubmit }) {
  const storage = getStorage();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Ref to access file input element

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the file and generate a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Upload the image file to Firebase Storage
      try {
        // Create a reference to the desired location in Firebase Storage
        const storageRef = ref(storage, `user_profiles/${file.name}`);

        // Upload the image file to Firebase Storage
        await uploadBytes(storageRef, file);
       

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        console.log('image URL is: ',imageUrl);

       // Update the updatedUserData state with the new image URL
setUpdatedUserData(prevState => ({ ...prevState, profileImage: imageUrl }));
        // Update the image preview with the new image URL
        setImagePreview(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Function to trigger file input click event
  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };

  return (
    <div className="edit-details-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div  style={{ display: 'flex' }}>
          <div className="profile-image-container">
            <div  style={{ display: 'flex' }}>
            <div>
              <label htmlFor="profileImage" className="profile-image-label" onClick={handleImageClick}
            style={{ width:'200px'}}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="profile-image" />
              ) : (
                <img src={userData.profileImage} alt="Profile" className="profile-image" />
              )}
              <div className="camera-icon"><TbCameraPlus /></div>
            </label>
           <input ref={fileInputRef} type="file" accept="image/*" name="profileImage" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
              <div className="image-text">
            Profile Image size <br/>
             150 x 150 pixels
          </div>
          </div>
            <label>
              <span className="label-text">Contact</span>
              <input type="text" name="contact" value={updatedUserData.contact || ''} onChange={handleInputChange} />
            </label>
          </div>

          <div className="details-left">
            <label>
              <span className="label-text">Full Name</span> <span style={{ color: 'red' }}>*</span>
              <input type="text" name="fullName" value={updatedUserData.fullName || ''} onChange={handleInputChange} />
            </label>

            <label>
              <span className="label-text">Email</span> <span style={{ color: 'red' }}>*</span>
              <input type="email" name="email" value={updatedUserData.email || ''} onChange={handleInputChange} />
            </label>

            <label>
              <span className="label-text">Address</span>
              <input type="text" name="address" value={updatedUserData.address || ''} onChange={handleInputChange} />
            </label>
          </div>
        </div>

        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [page, setPage] = useState('userDetails'); // State to manage the current page

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a GET request to fetch user details from the API
        const response = await axios.get(`/api/user-details/${userId}`);
        // Update state with the received user data
        setUserData(response.data);
        // Also store the initial user data for comparison later
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the function to fetch user data when the component mounts
  }, [userId]);

  // Function to handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the updatedUserData state with the new value
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to update user details in the database
      await axios.post(`/api/update-user-details/${userId}`, updatedUserData);
      // If the request is successful, update the userData state with the new data
      setUserData(updatedUserData);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <nav className="profile-navigation">
        <ul>
          <li className={page === 'userDetails' ? 'active' : ''} onClick={() => setPage('userDetails')}>
            User Details
          </li>
          <li className={page === 'editDetails' ? 'active' : ''} onClick={() => setPage('editDetails')}>
            Edit Details
          </li>
        </ul>
      </nav>
      {userData && (
        <div>
          {page === 'userDetails' && <UserDetails userData={userData} />}
          {page === 'editDetails' && (
            <EditDetails
              userData={userData}
              updatedUserData={updatedUserData}
              setUpdatedUserData={setUpdatedUserData} 
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
