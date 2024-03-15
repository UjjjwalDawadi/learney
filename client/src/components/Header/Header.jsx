import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Header.css';
import Tooltip from '../../Tooltip/Tooltip';
import { useAuth } from '../../authentication/AuthContext';

import { RiAccountCircleLine } from 'react-icons/ri';
import Defaultprofile from '../../resources/Images/default-profile.png';
import UserManagement from '../../resources/Images/UserManagement.png';
import { MdOutlineShoppingCart, MdOutlineSettings, MdOutlineDashboardCustomize, MdOutlineLogout } from 'react-icons/md';
import { FaRegHeart, FaSearch } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import CourseGif from '../../resources/Images/Course.gif';

const Header = () => {
  const { username, userRole, loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
          <li className={location.pathname === '/community' ? 'active' : ''} onClick={() => handleNavigation('/community')}>
            Community
          </li>
          {!loggedIn ? (
            <div className="get-started" onClick={() => handleNavigation('/userform')}>
              <a >Get Started</a>
            </div>
          ) : (
            <div className="user-container" onMouseEnter={() => setShowAccountTooltip(true)} onMouseLeave={() => setShowAccountTooltip(false)}>
              <img src={Defaultprofile} alt="default profile"></img>
              <div className="user-details">
                <span className="user-name">
                  {username}
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
                            <img src={CourseGif} alt="course" />
                          </span>
                          <a href="/enrolled-courses">Enrolled Courses</a>
                        </li>
                        <li>
                          <span className="icon">
                            <FaRegHeart />
                          </span>
                          <a href="/profile"> Wishlist</a>
                        </li>
                        <li>
                          <span className="icon">
                            <MdOutlineShoppingCart />
                          </span>
                          <a href="/profile"> Cart</a>
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
