import React, { useState } from 'react';
import './Settings.css';
import axios from 'axios';

function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Perform validation
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match');
      return;
    }
  
    // Validate the new password
    const passwordLengthRegex = /^.{6,}$/;
    const passwordLetterRegex = /[A-Za-z]/;
    const passwordNumberRegex = /\d/;
    
    let errorMessage = '';
    if (!passwordLengthRegex.test(newPassword)) {
      errorMessage += 'Password must be at least 6 characters long. ';
    }
    if (!passwordLetterRegex.test(newPassword)) {
      errorMessage += 'Password must contain at least one letter. ';
    }
    if (!passwordNumberRegex.test(newPassword)) {
      errorMessage += 'Password must contain at least one number. ';
    }
  
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }
  
    try {
      // Send a POST request to the backend to update the password
      const response = await axios.post(`/api/update-user-password/${userId}`, {
        currentPassword,
        newPassword,
      });
      // Handle success response
      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      // Handle error response
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error updating password. Please try again later.');
      }
    }
  };
  
  
  return (
    <div className='change-pass-ctr'>
      <h1>Change Password</h1>
      {message && <p className='validation-message'>{message}</p>}
      <form onSubmit={handleSubmit} className='profile-form'>
        <div style={{ paddingLeft: '30%' }}>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div >
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
