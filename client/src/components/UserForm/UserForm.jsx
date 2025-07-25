import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/AuthContext';

import './UserForm.css';

const UserForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const enteredUsername = e.target.elements.username.value;
    const enteredPassword = e.target.elements.password.value;
    const data = { username: enteredUsername, password: enteredPassword };
    

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      
    })
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.errors.map((error) => error.msg).join('\n'));
          });
        }
        return response.json();
      })
      .then((data) => {
        const userRole = data.userRole; 
        const userEmail = data.userEmail;
        const fullName = data.fullName;
        const userId = data.userId;

        if (data) {
    
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('username',enteredUsername )
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);

          navigate('/homepage');
        } else {
          console.log('Login failed');
          setLoginErrorMessage('Login Failed');
        }

        login(enteredUsername,userRole,userEmail);


      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setLoginErrorMessage(error.message);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const enteredFullName = e.target.elements.fullName.value;
    const enteredUsername = e.target.elements.username.value;
    const enteredEmail = e.target.elements.email.value;
    const enteredPassword = e.target.elements.password.value;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fullName: enteredFullName, username: enteredUsername, email: enteredEmail, password: enteredPassword}),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors.map((error) => error.msg).join('\n'));
      }

      const data = await response.text();
      

      if (data.includes('token')) {

        const parsedData = JSON.parse(data);

        const token = parsedData.token;

     
        localStorage.setItem('token', token);
    localStorage.setItem('fullName', enteredFullName);
    localStorage.setItem('userEmail', enteredEmail);

        navigate('/userrole');
      } else {
        setRegisterErrorMessage('Registration failed');
      }
      
    } catch (error) {
      console.error('Error registering user:', error);
      setRegisterErrorMessage(error.message);
    }
  };

  return (
    <div className={`container ${isSignIn ? '' : 'active'}`}>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="login-message">{loginErrorMessage && <p>{loginErrorMessage}</p>}</div>
          <input type="username" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
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
          <div className="register-message">{registerErrorMessage && <p>{registerErrorMessage}</p>}</div>
          <input type="text" name="fullName" placeholder="Full Name" />
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
          {!isSignIn && (
            <button className="hidden" onClick={toggleForm}>
              Sign In
            </button>
          )}
          
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Join Us!</h1>
            <p>Register and begin your journey of learning and discovery.</p>
            <p >Already have an account?</p>
            <button className="hidden" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Sign in and continue your journey of learning and discovery.</p>
            <p style={{marginBottom : '8px'}}>New to Learney? </p>
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
