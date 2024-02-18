
// Header.js
import React, { useState } from 'react';
import './Header.css';
import Tooltip from './Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import Defaultprofile from '../../resources/Images/default-profile.png';
import UserManagement from '../../resources/Images/UserManagement.png'
import { MdOutlineShoppingCart, MdOutlineKeyboardDoubleArrowDown, MdOutlineLogout} from 'react-icons/md';
import { FaRegHeart, } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";
import { GiProgression } from "react-icons/gi";
import CourseGif from '../../resources/Images/Course.gif'
const userRole = 'Student';


const Header = () => {
  const navigate = useNavigate();
  const [showCartTooltip, setShowCartTooltip] = useState(false);
  const [showHeartTooltip, setShowHeartTooltip] = useState(false);
  const [showAccountTooltip, setShowAccountTooltip] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/userform')
  }

  return (
    <nav className="header">
      <div className="header-left">
        <span className="header-brand">Learney</span>
      </div>
      <div className="header-middle">
        <input type="text" placeholder="Search anything... " />
      </div>
      <div className="header-right">
        <ul>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li onClick={() => handleNavigation('/courses')}>
            Courses
          </li>
          <li onClick={() => handleNavigation('/community')}>
            Community
          </li>
          {userRole === 'Student' && (
            <>
              <span
                className="cart-icon"
                onMouseEnter={() => setShowCartTooltip(true)}
                onMouseLeave={() => setShowCartTooltip(false)}
              >
                <MdOutlineShoppingCart />
                {showCartTooltip && <Tooltip>Cart Info</Tooltip>}
              </span>
              <span
                className="heart-icon"
                onMouseEnter={() => setShowHeartTooltip(true)}
                onMouseLeave={() => setShowHeartTooltip(false)}
              >
                <FaRegHeart />
                {showHeartTooltip && <Tooltip>Wishlist Info</Tooltip>}
              </span>
            </>
          )}
          
          <div className='account-icon' onMouseEnter={() => setShowAccountTooltip(true)}
              onMouseLeave={() => setShowAccountTooltip(false)}>
          <span className='icon-1'><img src={Defaultprofile}  alt='default profile'></img></span>
          {userRole === 'Student' ? (
            
            <li className='account-tooltip'>
               <span className='down-arrow'><MdOutlineKeyboardDoubleArrowDown/></span>
               {showAccountTooltip && <Tooltip>
    <ul>
          <li><span className='icon'><RiAccountCircleLine /></span><a href="/profile">Profile</a></li>
          <li><span className='icon'><img src= {CourseGif} alt="Teacher" /></span>
          <a href="/enrolled-courses">Enrolled Courses</a></li>
          <li><span className='icon'><GiProgression /></span><a href="/track-progress">My Progress</a></li>
          <li onClick={logout}><span className='icon' ><MdOutlineLogout /></span>Logout</li>
    </ul>
  </Tooltip>}
            </li>
          ) : userRole === 'Admin' ? (
            <li className='account-tooltip'>
               <span className='down-arrow'><MdOutlineKeyboardDoubleArrowDown/></span>
               {showAccountTooltip && <Tooltip>
    <ul>
          <li><span className='icon'><RiAccountCircleLine /></span><a href="/profile">Profile</a></li>
          <li><span className='icon'><img src= {CourseGif} alt="Teacher" /></span>
          <a href="/enrolled-courses">Manage Courses</a></li>
          <li><span className='icon'><img src= {UserManagement} alt="User management" /></span><a href="/manage-user">Manage Users</a></li>
          <li><span className='icon'><MdOutlineLogout /></span><a href="/userform">Logout</a></li>
    </ul>
  </Tooltip>}
            </li>
          ) : (
            <li className='account-tooltip'>
               <span className='down-arrow'><MdOutlineKeyboardDoubleArrowDown/></span>
               {showAccountTooltip && <Tooltip>
    <ul>
          <li><span className='icon'><RiAccountCircleLine /></span><a href="/profile">Profile</a></li>
          <li><span className='icon'><img src= {CourseGif} alt="Teacher" /></span>
          <a href="/enrolled-courses">Manage Courses</a></li>
          <li><span className='icon'><TbReport /></span><a href="/reports">Reports</a></li>
          <li><span className='icon' onClick={logout}><MdOutlineLogout /></span>Logout</li>
    </ul>
  </Tooltip>}
            </li>
          )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;