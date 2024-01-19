// src/App.jsx

import React from 'react';
import { AuthProvider } from './authentication/AuthContext'; 
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import HomePage from './components/HomePage/HomePage';

import UserForm from './components/UserForm/UserForm';



function App() {
  return (
    <AuthProvider>
      <div className="App">


        <UserForm />
        <HomePage/>

        {/* Add other components/containers as needed */}
      </div>
    </AuthProvider>
  );
}

export default App;
