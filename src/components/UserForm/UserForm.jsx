// src/components/UserForm/UserForm.jsx
import React, { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic...
    console.log('Logging in');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Your signup logic...

    // Simulating a successful registration
    console.log('Registration successful');
  };

  return (
    <div className={`container ${isSignIn ? '' : 'active'}`}>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            {/* Add your social icons here */}
          </div>
          <input type="username" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
          <button className="hidden" onClick={toggleForm}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-icons">
            {/* Add your social icons here */}
          </div>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
          <button className="hidden" onClick={toggleForm}>
            Sign In
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Join Us!</h1>
            <p>Register and begin your journey of learning and discovery.</p>
            <button className="hidden" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Sign in and continue your journey of learning and discovery.</p>
            <button className="hidden" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
