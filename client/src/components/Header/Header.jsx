import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import { useAuth } from '../../authentication/AuthContext';
import './Header.css';
import Tooltip from '../../Tooltip/Tooltip';

import { RiAccountCircleLine } from 'react-icons/ri';
import UserManagement from '../../resources/Images/UserManagement.png';
import { MdOutlineShoppingCart, MdOutlineSettings, MdOutlineDashboardCustomize, MdOutlineLogout } from 'react-icons/md';
import {  FaSearch, FaRegBookmark } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import CourseGif from '../../resources/Images/Course.gif';

const Header = () => {
  const [profileImage, setProfileImage] = useState('');
  const {  userRole, loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountTooltip, setShowAccountTooltip] = useState(false);
  const [fullName, setFullName] = useState('');
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // Make an API call to fetch the user's profile image
        const response = await axios.get(`/api/user-details/${userId}`);
                setProfileImage(response.data.profileImage);
        setFullName( response.data.fullName);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    if (loggedIn) {
      fetchProfileImage();
    }
  }, [loggedIn,userId]);
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="header">
      <div className="header-left">
        <span className="header-brand">Learney</span>
      </div>
      <div className="header-middle">
        <span className="search-icon">
          <FaSearch />
          <input type="text" placeholder="Search anything... " />
        </span>
      </div>
      <div className="header-right">
        <ul>
          <li className={location.pathname === '/homepage' ? 'active' : ''} onClick={() => handleNavigation('/homepage')}>
            Home
          </li>
          <li className={location.pathname === '/courses' ? 'active' : ''} onClick={() => handleNavigation('/courses')}>
            Courses
          </li>
          <li className={location.pathname === '/forum' ? 'active' : ''} onClick={() => handleNavigation('/forum')}>
            Forum
          </li>
          <li>
                          
            <a href="/cart"><span className="cart-header">
              <MdOutlineShoppingCart />
            </span></a>
          </li>
          {!loggedIn ? (
            <div className="get-started" onClick={() => handleNavigation('/userform')}>
              <button>Get Started</button>
            </div>
          ) : (
            <div className="user-container" onMouseEnter={() => setShowAccountTooltip(true)} onMouseLeave={() => setShowAccountTooltip(false)}>
              <img src={profileImage } alt=""></img>
              <div className="user-details">
                <span className="user-name">
                  {fullName}
                </span>
                <span className="user-role">
                  {userRole}
                </span>
              </div>
              {userRole === 'Student' ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <MdOutlineDashboardCustomize />
                          </span>
                          <a href="/dashboard/1">DashBoard</a>
                        </li>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/dashboard/profile"> My Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={CourseGif} alt="course" />
                          </span>
                          <a href="/dashboard/enrolled-courses">Enrolled Courses</a>
                        </li>
                        <li>
                          <span className="icon">
                            <FaRegBookmark />
                          </span>
                          <a href="/dashboard/bookmark"> Bookmark</a>
                        </li>
                      </ul>
                      <div className="sub-links">
                        <ul>
                          <li>
                            <span className="icon">
                              <MdOutlineSettings />
                            </span>
                            <a href="/dashboard/settings"> Settings</a>
                          </li>
                          <li onClick={logout}>
                            <span className="icon">
                              <MdOutlineLogout />
                            </span>
                            <a href="/userform"> Logout</a>
                          </li>
                        </ul>
                      </div>
                    </Tooltip>
                  )}
                </li>
              ) : userRole === 'Admin' ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <MdOutlineDashboardCustomize />
                          </span>
                          <a href="/student-dashboard">DashBoard</a>
                        </li>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/profile">My Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={CourseGif} alt="Teacher" />
                          </span>
                          <a href="/enrolled-courses">Manage Courses</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={UserManagement} alt="User management" />
                          </span>
                          <a href="/manage-user">Manage Users</a>
                        </li>
                      </ul>
                      <div className="sub-links">
                        <ul>
                          <li>
                            <span className="icon">
                              <MdOutlineSettings />
                            </span>
                            <a href="/settings"> Settings</a>
                          </li>
                          <li onClick={logout}>
                            <span className="icon">
                              <MdOutlineLogout />
                            </span>
                            <a href="/userform"> Logout</a>
                          </li>
                        </ul>
                      </div>
                    </Tooltip>
                  )}
                </li>
              ) : userRole === 'Teacher' ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <MdOutlineDashboardCustomize />
                          </span>
                          <a href="/dashboard">DashBoard</a>
                        </li>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/profile"> My Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={CourseGif} alt="Teacher" />
                          </span>
                          <a href="/enrolled-courses">Manage Courses</a>
                        </li>
                        <li>
                          <span className="icon">
                            <TbReport />
                          </span>
                          <a href="/reports">Reports</a>
                        </li>
                      </ul>
                      <div className="sub-links">
                        <ul>
                          <li>
                            <span className="icon">
                              <MdOutlineSettings />
                            </span>
                            <a href="/settings"> Settings</a>
                          </li>
                          <li onClick={logout}>
                            <span className="icon">
                              <MdOutlineLogout />
                            </span>
                            <a href="/userform"> Logout</a>
                          </li>
                        </ul>
                      </div>
                    </Tooltip>
                  )}
                </li>
              ) : (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <MdOutlineDashboardCustomize />
                          </span>
                          <a href="/student-dashboard">DashBoard</a>
                        </li>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/profile"> My Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={CourseGif} alt="Teacher" />
                          </span>
                          <a href="/enrolled-courses">Manage Courses</a>
                        </li>
                        <li>
                          <span className="icon">
                            <TbReport />
                          </span>
                          <a href="/reports">Reports</a>
                        </li>
                      </ul>
                      <div className="sub-links">
                        <ul>
                          <li>
                            <span className="icon">
                              <MdOutlineSettings />
                            </span>
                            <a href="/settings"> Settings</a>
                          </li>
                          <li onClick={logout}>
                            <span className="icon">
                              <MdOutlineLogout />
                            </span>
                            <a href="/userform"> Logout</a>
                          </li>
                        </ul>
                      </div>
                    </Tooltip>
                  )}
                </li>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
