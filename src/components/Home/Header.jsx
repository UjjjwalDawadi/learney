// Header.js
import React, { useState } from 'react';
import './Header.css';
import Tooltip from './Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [showCartTooltip, setShowCartTooltip] = useState(false);
  const [showHeartTooltip, setShowHeartTooltip] = useState(false);
  const [showAccountTooltip, setShowAccountTooltip] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="header">
      <div className="header-left">
        <span className="header-brand">Learney</span>
      </div>
      <div className="header-middle">
        <input type="text" placeholder ="Search anything... "  />
      </div>
      <div className="header-right">
        <ul>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li onClick={() => handleNavigation('/courses')}>
            Courses
          </li>
          <li onClick={() => handleNavigation('/')}>
            My progress
          </li>
          <span
            className="cart-icon"
            onMouseEnter={() => setShowCartTooltip(true)}
            onMouseLeave={() => setShowCartTooltip(false)}
          >
            <MdOutlineShoppingCart />
            {showCartTooltip && <Tooltip text="Cart Information" />}
          </span>
          <span
            className="heart-icon"
            onMouseEnter={() => setShowHeartTooltip(true)}
            onMouseLeave={() => setShowHeartTooltip(false)}
          >
            <FaRegHeart />
            {showHeartTooltip && <Tooltip text="Wishlist Information" />}
          </span>
          <span
            className="account-icon"
            onMouseEnter={() => setShowAccountTooltip(true)}
            onMouseLeave={() => setShowAccountTooltip(false)}
          >
            <RiAccountCircleLine />
            {showAccountTooltip && <Tooltip text="Account Info" />}
          </span>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
