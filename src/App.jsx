// src/App.jsx

import React from 'react';
// import { AuthProvider } from './authentication/AuthContext'; 
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';

import HomePage from './components/Home/HomePage';

// import UserForm from './components/UserForm/UserForm';

function App() {
  return (
    // <AuthProvider>
      <div className="App">


        {/* <UserForm /> */}
        <HomePage/>
      </div>
    // </AuthProvider>
  );
}

export default App;
