import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import Tooltip from './Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import Defaultprofile from '../../resources/Images/default-profile.png';
import UserManagement from '../../resources/Images/UserManagement.png';
import { MdOutlineShoppingCart, MdOutlineSettings, MdOutlineDashboardCustomize, MdOutlineLogout } from 'react-icons/md';
import { FaRegHeart, FaSearch, FaCaretDown } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import CourseGif from '../../resources/Images/Course.gif';
import { UserContext } from '../../UserContext'; // Import UserContext as a named export


const Header = () => {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountTooltip, setShowAccountTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
    // Fetch the user role using the JWT token
    const fetchData = async () => {
      try {
        const response = await fetch('/api/userRole/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
    
        const data = await response.json();
        console.log('Response:', data);
     // Log the response data
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        // Handle unauthorized error
        if (error.message === 'Unauthorized') {
          // Redirect to login page or show an error message
          navigate('/homepage');
        }
      }
    };
  
    fetchData();
  }, [navigate]);
    

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/userform');
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="account-icon" onMouseEnter={() => setShowAccountTooltip(true)} onMouseLeave={() => setShowAccountTooltip(false)}>
              <span className="icon-1">
                <img src={Defaultprofile} alt="default profile"></img>
              </span>
              {userRole === 'Student' ? (
                <li className="account-tooltip">
                  <span className="down-arrow">
                    <FaCaretDown />
                  </span>
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
                  <span className="down-arrow">
                    <FaCaretDown />
                  </span>
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/profile">Profile</a>
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
                        <li>
                          <span className="icon">
                            <MdOutlineLogout />
                          </span>
                          <a href="/userform">Logout</a>
                        </li>
                      </ul>
                    </Tooltip>
                  )}
                </li>
              ) : (
                <li className="account-tooltip">
                  <span className="down-arrow">
                    <FaCaretDown />
                  </span>
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/profile">Profile</a>
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
                        <li>
                          <span className="icon">
                            <MdOutlineSettings />
                          </span>
                          Settings
                        </li>
                        <li>
                          <span className="icon" onClick={logout}>
                            <MdOutlineLogout />
                          </span>
                          Logout
                        </li>
                      </ul>
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
