import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { IoTimeOutline, IoClose } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { PiStudentDuotone, PiCellSignalHighLight } from "react-icons/pi";
import {FaRegBookmark, FaBookmark, FaRegHandPointRight, FaArrowAltCircleDown,
       FaVideo,} from "react-icons/fa";
import "./CourseDetails.css";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [watchedTime, setWatchedTime] = useState(0);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  const location = useLocation();
  const enrolledQueryParam = new URLSearchParams(location.search).get("enrolled");
  const enrolled = enrolledQueryParam === "true";  

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`/api/courses/${courseId}/details`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        
        const data = await response.json();
        setCourseDetails(data);
  
        // Fetch course progress
        const progressResponse = await axios.get(`/api/progress/${userId}/${courseId}`);
        const courseProgress = progressResponse.data;
        setCourseProgress(courseProgress);
        // Calculate progress percentage
        if (enrolled) {
          const promises = data.sections.flatMap(section =>
            section.videos.map(video => axios.post("/api/progress", {
              userId,
              courseId,
              sectionId: section.id,
              videoId: video.id,
              watchedTime: 0 // Initialize watched time to 0
            }))
          );
          await Promise.all(promises);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchCourseDetails();
  }, [courseId, enrolled]);
  
  

  const handleWishlistClick = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (isBookmarked) {
        await axios.delete(`/api/bookmark/${userId}/${courseId}`);
        alert("Bookmark removed");
      } else {
        await axios.post("/api/bookmarks", { courseId, userId });
        alert("Bookmark added");
      }
      setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    } catch (error) {
      console.error("Bookmark failed:", error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!isAlreadyInCart) {
        navigate("../cart");
        setIsAlreadyInCart(true);
      } else {
        await axios.post("/api/cart", { userId, courseId });
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);

  };

  const handleProgress = (progress) => {
    const roundedWatchedTime = Math.ceil(progress.playedSeconds);
    setWatchedTime(roundedWatchedTime);
  };

  const closeVideoPopup = () => {

    const newWatchedTime = watchedTime;
  console.log(watchedTime)
    const videoId = selectedVideo ? selectedVideo.id : null;
    const sectionId = selectedSection ? selectedSection.id : null; 
  
    if (newWatchedTime > (courseProgress ? courseProgress.progressPercentage.progressPercentage : 0)) {
      axios.put(`/api/progress/${userId}/${courseId}`, {
        watchedTime: newWatchedTime,
        videoId,
        sectionId
      }).then(response => {
        console.log("Watched time updated successfully");
        axios.get(`/api/progress/${userId}/${courseId}`)
        .then(response => {
          const updatedProgress = response.data;
          setCourseProgress(updatedProgress);
        })
      }).catch(error => {
        // Handle error
        console.error("Error updating watched time:", error);
      });
    }
  
    // Close the video popup
    setSelectedVideo(null);
  };
  

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  const handleSectionClick = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBuyNowClick = () => {
    const initialPrice = courseDetails.course.price;
    const price = Math.floor(parseFloat(initialPrice));
    console.log(price);
    navigate("/khalti-payment", { state: { courseId, price } });
  };


  return (
    <div className="course-details-container">
      <div className="course-details-left">
        <div className="banner">
          <div className="course-details">
            <h1>{courseDetails.course.title} </h1>
            <p>{courseDetails.course.description}</p>
            <p style={{ color: "yellow" }}>
              Ratings and reviews will display here
            </p>
            <p style={{ marginTop: "15px" }}>
              Uploaded by: {courseDetails.course.uploadedBy}
            </p>
            <p
              style={{
                color: "rgb(250 22 6 / 88%)",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              {courseDetails.course.category}
            </p>
          </div>
        </div>
        <div className="course-details">
          <h2>What will you learn</h2>
          <div className="learning-objectives">
            {courseDetails.learningObjectives.map((objective, index) => (
              <div className="learning-objective" key={index}>
                <FaRegHandPointRight />
                {objective.objectives}
              </div>
            ))}
          </div>
        </div>
        {selectedVideo && (
          <div className="video-popup">
            <div className="video-popup-content">
              <ReactPlayer
                className="video-player"
                url={selectedVideo.url}
                controls
                width="auto"
                height="auto"
                onProgress={handleProgress}
              />
              <button onClick={closeVideoPopup}>
                <span style={{ fontSize: "30px" }}>
                  <IoClose />
                </span>
              </button>
            </div>
          </div>
        )}
        <div className="course-details">
          <h2>Contents</h2>
          {courseDetails.sections.map((section, index) => (
            <div key={index} className="section-wrapper">
              <div
                className="section-header"
                onClick={() => handleSectionClick(section)}
              >
                <h3
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Module {index + 1}: {section.title}
                  <span className="duration">
                    <FaArrowAltCircleDown
                      style={{ color: "black" }}
                      className={selectedSection === section ? "rotate" : ""}
                    />
                    {section.sectionDuration}
                  </span>
                </h3>
              </div>
              {selectedSection === section && (
                <ul className="video-list">
                  {section.videos.map((video, videoIndex) => (
                    <li
                      key={videoIndex}
                      onClick={() => handleVideoClick(video)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "20px",
                      }}
                    >
                      <span>
                        <FaVideo />
                        {video.title}{" "}
                      </span>
                      <span className="duration">{video.duration}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="course-details">
          <h2>Review</h2>
          reviews will come here
        </div>
      </div>
      <div className="course-details-right">
        <div className="upper-right">
          {enrolled ? (
            // Render progress tracking if enrolled
            <div className="progress-tracking">
  <h2>Course Progress</h2>
  <div className="progress-info">
      <div className="step-info">
        <span>{courseProgress!== null ? `${courseProgress.progressPercentage.progressPercentage}% Completed` : 'Loading...'}</span>
      </div>
      <div className="progress-bar">
        <span
          style={{ width: `${courseProgress!== null ? courseProgress.progressPercentage.progressPercentage : 0}%` }}
          aria-hidden="true"
        ></span>
      </div>
      {courseProgress  && (
        <div className="enrollment-date">
          You enrolled in this course on: <span>{formatDate(courseProgress.progressPercentage.enrollmentDate)}</span>
        </div>
      )}
    </div>
</div>
          ) : (
            <div>
              <h2>Rs {courseDetails.course.price}</h2>
              {userRole === "Student" && (
                <div className="buttons">
                  <button className="btn-1" onClick={handleAddToCart}>
                    {!isAlreadyInCart ? "View in Cart" : "Add to Cart"}
                  </button>
                  <button className="btn-2" onClick={handleWishlistClick}>
                    <span title="Add to wishlist">
                      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </span>
                  </button>
                  <div>
                    <button className="btn-3" onClick={handleBuyNowClick}>
                      Buy Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="course-dtls-rt">
            <p>
              <span className="right-icons">
                <PiStudentDuotone />
              </span>{" "}
              Students Enrolled {courseDetails.studentsEnrolled}
            </p>
            <p>
              <span className="right-icons">
                <PiCellSignalHighLight />
              </span>
              {" "}{courseDetails.course.difficultyLevel} Level
            </p>
            <p>
              <span className="right-icons">
                <IoTimeOutline />
              </span>{" "}
              Duration {courseDetails.course.courseDuration}
            </p>
            <p>
              <span className="right-icons">
                <GrUpdate />
              </span>{" "}
              Updated on {formatDate(courseDetails.course.updatedAt)}
            </p>
          </div>
        </div>
        <div className="course-dtls-rt">
          <h2>This course includes</h2>
          <ul>
            <li>
              {courseDetails.sections.reduce(
                (total, section) => total + section.videos.length,
                0
              )}{" "}
              <span style={{ marginLeft: "5px" }}>on-demand videos</span>
            </li>
            <li>Lifetime Access</li>
          </ul>
        </div>
        <div className="course-dtls-rt">
          <h2>Requirements</h2>
          <ul>
            {courseDetails.learnerRequirements.map((requirement, index) => (
              <li key={index}>{requirement.requirements}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
