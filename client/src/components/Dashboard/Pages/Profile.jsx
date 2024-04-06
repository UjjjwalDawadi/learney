import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import CSS file for styling
import axios from 'axios';
import { BsDashLg } from "react-icons/bs";

function UserDetails({ userData }) {
  return (
    <div className="user-details-container">
    <p><span className="details-label">Full Name:</span> {userData.fullName}</p>
    <p><span className="details-label">Username:</span> {userData.username}</p>
    <p><span className="details-label">Role:</span> {userData.role}</p>
    <p><span className="details-label">Email:</span> {userData.email}</p>
    <p><span className="details-label">Contact:</span> {userData.contact || <BsDashLg style={{marginLeft:'1%'}}/>}</p>
    <p><span className="details-label">Address:</span> {userData.address || <BsDashLg style={{marginLeft:'1%'}}/>}</p>
  </div>
  );
}

function EditDetails({ userData, updatedUserData, handleInputChange, handleSubmit }) {
  return (
    <div className="edit-details-container">
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={updatedUserData.fullName || ''} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={updatedUserData.email || ''} onChange={handleInputChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={updatedUserData.contact || ''} onChange={handleInputChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={updatedUserData.address || ''} onChange={handleInputChange} />
        </label>
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
