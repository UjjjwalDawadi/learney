import React from 'react';
import Header from './Header'; 
import Body from './Body';

const HomePage = ({ userRole }) => { 
  return (
    <div>
      <Header userRole={userRole} /> 
      <Body />
    </div>
  );
};

export default HomePage;
