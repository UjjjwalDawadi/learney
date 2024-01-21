import React from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="header">
      <div className="header-left">
        <span className="header-brand">Learney</span>
      </div>
      <div className="header-middle">
        {/* Add your search bar component here */}
        <input type="text" placeholder="Search for " />
      </div>
      <div className="header-right">
        <ul>
          <li>
            <Link to="/HomePage">Home</Link>
          </li>
          <li onClick={() => handleNavigation('/')}>
            Dashboard
          </li>
          <li onClick={() => handleNavigation('/')}>
            Courses
          </li>
          {/* Add more navigation links here */}
          <li>
            {/* Add your account icon component here */}
            <span><MdAccountCircle /></span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
