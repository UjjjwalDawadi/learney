import React, { useEffect, useState } from 'react';

function Profile() {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {username}</p>
      <p>Email: {userEmail}</p>
    </div>
  );
}

export default Profile;
