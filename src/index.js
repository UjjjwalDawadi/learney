import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter alias

import App from './App.jsx'; // Update the correct path

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
