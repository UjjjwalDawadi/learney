import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub} from "react-icons/fa";
import { useAuth } from '../../authentication/AuthContext';
import './UserForm.css';

const UserForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredUsername = e.target.elements.username.value;
    const enteredPassword = e.target.elements.password.value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: enteredUsername, password: enteredPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          login(enteredUsername);
          navigate('/homepage');
        } else {
          console.log('Login failed');
          // You can add error handling or display an error message to the user
        }
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  
    const enteredUsername = e.target.elements.username.value;
    const enteredEmail = e.target.elements.email.value;
    const enteredPassword = e.target.elements.password.value;
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: enteredUsername, email: enteredEmail, password: enteredPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          login(enteredUsername);
          navigate('/userrole');
        } else {
          console.log('Registration failed');
          // You can add error handling or display an error message to the user
        }
      });
  };

  return (
    <div className={`container ${isSignIn ? '' : 'active'}`}>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          
          <input type="username" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <a href="homepage">Forget Your Password?</a>
          <button type="submit">Sign In</button>
          <button className="hidden" onClick={toggleForm}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <input type="text" name="username"  placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
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
