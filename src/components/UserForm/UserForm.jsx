import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub} from "react-icons/fa";
// import SocialLogin from '../Social/SocialLogin';
import './UserForm.css';

const UserForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const hardcodedUsername = "ujjwal";
    const hardcodedPassword = "12";
 
    const enteredUsername = e.target.elements.username.value;
    const enteredPassword = e.target.elements.password.value;

  // Check if entered credentials match the hardcoded credentials
  if (enteredUsername === hardcodedUsername && enteredPassword === hardcodedPassword) {
    // Simulating a successful login
    console.log('Logging in');
    navigate('/homepage');
  } else {
    // Simulating a failed login
    console.log('Login failed');
    // You can add error handling or display an error message to the user
  }

  };

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log('Registration successful');
    
    // Navigate to the home page after successful registration
    navigate('/userrole');
  };

  return (
    <div className={`container ${isSignIn ? '' : 'active'}`}>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          
          <input type="username" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
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
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
          <button className="hidden" onClick={toggleForm}>
            Sign In
          </button>
          <h1>Or continue with </h1>
          <div className="social-icons">
            {/* <SocialLogin/> */}
            <li><FaGoogle /></li>
            <li><FaFacebook /></li>
            <li><FaLinkedin /></li>
            <li><FaGithub /></li>
          </div>
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
