import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import axios from 'axios';
import { BsDashLg } from 'react-icons/bs';
import { TbCameraPlus } from 'react-icons/tb';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function UserDetails({ userData }) {
  return (
    <div className="user-details-container">
      <p>
        <span className="details-label">Full Name:</span> {userData.fullName}
      </p>
      <p>
        <span className="details-label">Username:</span> {userData.username}
      </p>
      <p>
        <span className="details-label">Role:</span> {userData.role}
      </p>
      <p>
        <span className="details-label">Email:</span> {userData.email}
      </p>
      <p>
        <span className="details-label">Contact:</span>{' '}
        {userData.contact || <BsDashLg style={{ marginLeft: '1%' }} />}
      </p>
      <p>
        <span className="details-label">Address:</span>{' '}
        {userData.address || <BsDashLg style={{ marginLeft: '1%' }} />}
      </p>
    </div>
  );
}

function EditDetails({ userData, updatedUserData, setUpdatedUserData, handleSubmit }) {
  const storage = getStorage();
  const [imagePreview, setImagePreview] = useState(null);
  const [isValidContact, setIsValidContact] = useState(true);
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);  
  const [isFormValid, setIsFormValid] = useState(true);

  const fileInputRef = useRef(null);

  const handleContactChange = (e) => {
    const { value } = e.target;
    const isValidInput = /^\d{10}$/.test(value) || value === '';
    setIsValidContact(isValidInput);
    setIsFormValid(isValidInput);
    setUpdatedUserData((prevState) => ({ ...prevState, contact: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValidInput = true;

    if (name === 'fullName') {
      isValidInput = /^[a-zA-Z\s]+$/.test(value) && value.trim().split(/\s+/).length >= 2;
      setIsFullNameValid(isValidInput);
    }

    if (name === 'email') {
      isValidInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setIsValidEmail(isValidInput);
    }
    if (name === 'address') {
      isValidInput =   /^[a-zA-Z0-9\s]+$/.test(value) ;
      isValidInput = (isValidInput && /[a-zA-Z]/.test(value) && /[0-9]/.test(value))  ||(value === '');
      setIsValidAddress(isValidInput);
    }

    setUpdatedUserData({ ...updatedUserData, [name]: value });
    setIsFormValid(isValidContact && isValidInput);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      try {
        const storageRef = ref(storage, `user_profiles/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setUpdatedUserData((prevState) => ({ ...prevState, profileImage: imageUrl }));
        setImagePreview(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="edit-details-container">
      {!isFormValid &&
      <p className='validation-message'> Invalid field input found</p>}
      <form onSubmit={handleSubmitForm} className="profile-form">
        <div style={{ display: 'flex' }}>
          <div className="profile-image-container">
            <div style={{ display: 'flex' }}>
              <div>
                <label htmlFor="profileImage" className="profile-image-label" onClick={handleImageClick} style={{ width: '200px' }}>
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
                Profile Image size <br />
                150 x 150 pixels
              </div>
            </div>
            <label>
              <span className="label-text">Contact</span>
              <input
                type="number"
                name="contact"
                value={updatedUserData.contact || ''}
                onChange={handleContactChange}
                className={isValidContact ? 'valid' : 'invalid-input'}
              />
            </label>
          </div>

          <div className="details-left">
            <label>
              <span className="label-text">Full Name</span> <span style={{ color: 'red' }}>*</span>
              <input type="text" name="fullName" value={updatedUserData.fullName || ''} onChange={handleInputChange} className={!isFullNameValid ? 'invalid-input' : 'valid'} />
            </label>

            <label>
              <span className="label-text">Email</span> <span style={{ color: 'red' }}>*</span>
              <input
                type="email"
                name="email"
                value={updatedUserData.email || ''}
                onChange={handleInputChange}
                className={!isValidEmail ? 'invalid-input' : 'valid'}
              />
            </label>

            <label>
              <span className="label-text">Address</span>
              <input type="text" name="address" value={updatedUserData.address || ''} onChange={handleInputChange} className={!isValidAddress ? 'invalid-input' : 'valid'} />
            </label>
          </div>
        </div>

        <button type="submit" className="update-button" disabled={!isFormValid}>
          Update
        </button>
      </form>
    </div>
  );
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [page, setPage] = useState('userDetails');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user-details/${userId}`);
        setUserData(response.data);
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/update-user-details/${userId}`, updatedUserData);
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
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
