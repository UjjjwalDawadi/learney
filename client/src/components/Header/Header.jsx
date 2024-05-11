import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import { useAuth } from "../../authentication/AuthContext";
import "./Header.css";
import { useLoading } from '../Loading/LoadingContext';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from "../../Tooltip/Tooltip";
import { RiAccountCircleLine } from "react-icons/ri";

import UserManagement from "../../resources/Images/UserManagement.png";
import {
  MdOutlineShoppingCart,
  MdOutlineSettings,
  MdOutlineDashboardCustomize,
  MdOutlineLogout,
} from "react-icons/md";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import CourseGif from "../../resources/Images/Course.gif";

const Header = () => {
  const [profileImage, setProfileImage] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();
  const { userRole, loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountTooltip, setShowAccountTooltip] = useState(false);
  const [fullName, setFullName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // Make an API call to fetch the user's profile image
        const response = await axios.get(`/api/user-details/${userId}`);
        setProfileImage(response.data.profileImage);
        setFullName(response.data.fullName);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setSearchResults(response.data); // Assuming the response data is an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };


    if (loggedIn) {
      fetchProfileImage();
      fetchCourses();
    }
  }, [loggedIn, userId]);
  const handleNavigation = (path) => {
    navigate(path);
  };
// Function to filter courses based on search query
const searchCourses = () => {
  try {
    startLoading();
        console.log("Search results before filtering:", searchResults); // Add this line
    const filteredCourses = searchResults.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered courses:", filteredCourses); // Add this line
    setSearchResults(filteredCourses);
stopLoading();
navigate("/courses", { state: { courses: filteredCourses } });

 } catch (error) {
    console.error("Error searching courses:", error);
stopLoading();
  }
};

// Handle search input change
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
  console.log("Search query:", event.target.value); 
};


// Handle search form submit
const handleSearchSubmit = (event) => {
  event.preventDefault();
  console.log("Search form submitted"); // Add this line
  searchCourses();
};



  return (
    <nav className="header">
      {loading && <CircularProgress style={{height:'110px', width:'110px',position:'absolute',top:'21%',left:'50%', zIndex:'10'}}/>}
      <div className="header-left">
        <span className="header-brand">Learney</span>
      </div>
      <div className="header-middle">
      <form onSubmit={handleSearchSubmit}>
          <span className="search-icon">
            <FaSearch />
            <input
              type="text"
              placeholder="Search anything... "
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </span>
        </form>
      </div>
      <div className="header-right">
        <ul>
          <li
            className={location.pathname === "/homepage" ? "active" : ""}
            onClick={() => handleNavigation("/homepage")}
          >
            Home
          </li>
          <li
            className={location.pathname === "/courses" ? "active" : ""}
            onClick={() => handleNavigation("/courses")}
          >
            Courses
          </li>
          <li
            className={location.pathname === "/forum" ? "active" : ""}
            onClick={() => handleNavigation("/forum")}
          >
            Forum
          </li>
          {userRole === "Student" && (
            <li>
              <a
                className={location.pathname === "/forum" ? "active" : ""}
                href="/cart"
              >
                <span className="cart-header">
                  <MdOutlineShoppingCart />
                </span>
              </a>
            </li>
          )}
          {!loggedIn ? (
            <div
              className="get-started"
              onClick={() => handleNavigation("/userform")}
            >
              <button>Get Started</button>
            </div>
          ) : (
            <div
              className="user-container"
              onMouseEnter={() => setShowAccountTooltip(true)}
              onMouseLeave={() => setShowAccountTooltip(false)}
            >
              <img src={profileImage} alt=""></img>
              <div className="user-details">
                <span className="user-name">{fullName}</span>
                <span className="user-role">{userRole}</span>
              </div>
              {userRole === "Student" ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
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
                          <a href="/dashboard/enrolled-courses">
                            Enrolled Courses
                          </a>
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
              ) : userRole === "Admin" ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <MdOutlineDashboardCustomize />
                          </span>
                          <a href="dashboard/1">DashBoard</a>
                        </li>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/dashboard/profile">My Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={UserManagement} alt="User management" />
                          </span>
                          <a href="/dashboard/manage-user">Manage Users</a>
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
              ) : userRole === "Teacher" ? (
                <li className="account-tooltip">
                  {showAccountTooltip && (
                    <Tooltip>
                      <ul>
                        <li>
                          <span className="icon">
                            <RiAccountCircleLine />
                          </span>
                          <a href="/dashboard/profile">Profile</a>
                        </li>
                        <li>
                          <span className="icon">
                            <img src={CourseGif} alt="Teacher" />
                          </span>
                          <a href="/dashboard/my-courses">My Courses</a>
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
              ) : (
                <li className="account-tooltip"></li>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
