import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";

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
        <input type="text" placeholder="Search anything " />
      </div>
      <div className="header-right">
        <ul>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li onClick={() => handleNavigation('/courses')}>
            Courses
          </li>
          <li className="cart-icon"><MdOutlineShoppingCart/></li>
          <li className="heart-icon"><FaRegHeart/></li>
          <li><Link to="/userform"><RiAccountCircleLine /></Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
