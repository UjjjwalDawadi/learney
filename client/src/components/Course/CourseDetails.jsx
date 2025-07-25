import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { IoTimeOutline, IoClose } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { PiStudentDuotone, PiCellSignalHighLight } from "react-icons/pi";
import CryptoJS from "crypto-js"; 

import {
  FaRegBookmark,
  FaBookmark,
  FaRegHandPointRight,
  FaArrowAltCircleDown,
  FaVideo,
  FaLock
} from "react-icons/fa";
import "./CourseDetails.css";
import HoverRating from "../Course/HoverRating";

const CourseDetailsPage = () => {
  const { courseId } = useParams(); 
    const [courseDetails, setCourseDetails] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reviewCounts, setReviewCounts] = useState(0); // State to store review counts for each course
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [userRated, setUserRated] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [totalRating, setTotalRating] = useState(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");
  const [enrolled, setIsEnrolled] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(0);




  useEffect(() => {
    const decryptParams = (encryptedParams, key) => {
      try {
        const decryptedParams = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), key).toString(CryptoJS.enc.Utf8);
        const params = JSON.parse(decryptedParams);
        return params;
      } catch (error) {
        console.error('Error decrypting parameters:', error.message);
        return {};
      }
    };
  
    const paramsString = new URLSearchParams(window.location.search).get("params");
    const decryptedParams = decryptParams(paramsString, 'secret');
  
    setStatus(decryptedParams.status);
    setIsEnrolled(decryptedParams.enrolled);
  }, []);
  
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
  
        // Fetch ratings and comments for the course
        const ratingResponse = await axios.get(`/api/get-ratings/${courseId}`);
        const ratings = ratingResponse.data;
        const totalRatingValue = ratings.reduce(
          (sum, rating) => sum + rating.ratingValue,
          0
        );
        const averageRating =
          ratings.length > 0 ? totalRatingValue / ratings.length : 0;
        setReviewCounts(ratings.length);
        setTotalRating(averageRating);
  
        const comments = ratings.map((rating) => rating.comment);
        setComments(comments);
  
        const ratingThreshold = 30;
        const progressPercentage = courseProgress
          ? courseProgress.progressPercentage.progressPercentage
          : 0;
        if (progressPercentage >= ratingThreshold) {
          const userRatingResponse = await axios.get(
            `/api/get-rating/${userId}/${courseId}`
          );
          const userRatings = userRatingResponse.data;
          setUserRated(userRatings.length > 0);
          setShowRatingPrompt(true);
        }
  
        if (enrolled) {
          const promises = data.sections.flatMap((section) =>
            section.videos.map((video) =>
              axios.post("/api/progress", {
                userId,
                courseId,
                sectionId: section.id,
                videoId: video.id,
                watchedTime: 0, // Initialize watched time to 0
              })
            )
          );
          await Promise.all(promises);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchCourseDetails();
  }, [courseId, enrolled, courseProgress]);
  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        const response = await axios.get(`/api/enrollment-count/${courseId}`);
        console.log(response,'rr')
        setEnrollmentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching enrollment count:', error);
      }
    };

    fetchEnrollmentCount();    
  }, [courseId]);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userRole === 'Student' && enrolled) {
          const progressResponse = await axios.get(`/api/progress/${userId}/${courseId}`);
          const courseProgressData = progressResponse.data;
          setCourseProgress(courseProgressData);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Enrollment not found");
        } else {
          console.error("Error fetching course progress:", error.message);
        }
      }
    };
  
    fetchCourseProgress();
  }, [userId, courseId, enrolled, userRole]);
  

  const handleSaveRating = async () => {
    try {
      const ratingData = {
        courseId: courseId,
        userId: userId,
        ratingValue: userRating,
        comment: comment,
      };

      const response = await axios.post("/api/ratings", ratingData);

      if (response.status === 201) {
        console.log("Rating saved successfully");
        setShowRatingPrompt(false);
      } else {
        console.error("Failed to save rating:", response.data);
      }
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

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
    console.log(watchedTime);
    const videoId = selectedVideo ? selectedVideo.id : null;
    const sectionId = selectedSection ? selectedSection.id : null;

    if (
      newWatchedTime >
      (courseProgress
        ? courseProgress.progressPercentage.progressPercentage
        : 0)
    ) {
      axios
        .put(`/api/progress/${userId}/${courseId}`, {
          watchedTime: newWatchedTime,
          videoId,
          sectionId,
        })
        .then((response) => {
          console.log("Watched time updated successfully");
          axios.get(`/api/progress/${userId}/${courseId}`).then((response) => {
            const updatedProgress = response.data;
            setCourseProgress(updatedProgress);
          });
        })
        .catch((error) => {
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
  const handleRatingClose = () => {
    setShowRatingPrompt(false);
  };
  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        stars.push(
          <span key={i} className="star-filled">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star-empty">
            ★
          </span>
        );
      }
    }
    return stars;
  };
  const handleStatusChange = async (newStatus) => {
    try {
      console.log(courseId)
      const response = await axios.post(`/api/courses/${courseId}/status`, { newStatus });
      if (response.status === 200) {
        console.log(`Course status changed to ${newStatus}`);
        navigate('/courses');
      } else {
        console.error("Failed to change course status:", response.data);
      }
    } catch (error) {
      console.error("Error changing course status:", error);
    }
  };
  
  
  return (
    <div className="course-details-container" style={{display:'flex', flexDirection:'column'}}>
      {!userRated && showRatingPrompt && (
        <div className="rating-prompt">
          <h2>How would you rate your experience with this course?</h2>
          <HoverRating
            value={userRating}
            onChange={(event, newValue) => setUserRating(newValue)}
          />
          <textarea
            type="text"
            placeholder="Add your comments (optional)"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="comment-input"
          />
          <div>
            <button onClick={handleSaveRating} className="btn-rating">
              Submit
            </button>
            <button onClick={handleRatingClose} className="btn-rating">
              Maybe, later
            </button>
          </div>
        </div>
      )}
      <div className="course-details-left">
        <div className="banner">
          <div className="course-details">
            <h1>{courseDetails.course.title} </h1>
            <p>{courseDetails.course.description}</p>
            <p style={{ color: "rgb(255 226 0)" }}>
              {totalRating}
              <span style={{ fontSize: "19px" }}> ★ </span>
              <span style={{ color: "#ff6811b2", fontSize: "19px" }}>
                ({reviewCounts})
              </span>
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
                      onClick={() => enrolled && handleVideoClick(video)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "20px",
                        cursor: enrolled ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span>
                        <FaVideo />
                        {video.title}{" "}
                      </span>
                      <div>
                      <span className="duration">{video.duration}</span>
                      {!enrolled && (
      <span>
        <FaLock style={{ color: '#7c6a6a', marginLeft: '20px' }} />
      </span>
    )}
    </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="course-details">
          <h2>Review</h2>
          <div className="comment-container">
            {comments.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              <ul>
                {comments.map((combinedComment, index) => {
                  const firstSpaceIndex = combinedComment.indexOf(" ");
                  const profileImage = combinedComment
                    .substring(0, firstSpaceIndex)
                    .trim(); // Extract the URL
                  const remainingComment = combinedComment
                    .substring(firstSpaceIndex + 1)
                    .trim(); 
                  const parts = remainingComment.split(":");
                  const fullName = parts[0].trim(); 
                  const comment = parts[1].trim(); 

                  return (
                    <li key={index}>
                      <div className="comment">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="comment-image"
                        />
                        <span className="full-name"> {fullName}</span>
                        <br />
                        <br />
                        <span className="star-container">
                          {renderStars(totalRating)}
                        </span>
                        <br />
                        <br />
                        {comment}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="course-details-right">
        <div className="upper-right">
          {enrolled ? (
            <div className="progress-tracking">
              <h2>Course Progress</h2>
              <div className="progress-info">
                <div className="step-info">
                  <span>
                    {courseProgress !== null
                      ? `${courseProgress.progressPercentage.progressPercentage}% Completed`
                      : "Loading..."}
                  </span>
                </div>
                <div className="progress-bar">
                  <span
                    style={{
                      width: `${
                        courseProgress !== null
                          ? courseProgress.progressPercentage.progressPercentage
                          : 0
                      }%`,
                    }}
                    aria-hidden="true"
                  ></span>
                </div>
                {courseProgress && (
                  <div className="enrollment-date">
                    You enrolled in this course on:{" "}
                    <span>
                      {formatDate(
                        courseProgress.progressPercentage.enrollmentDate
                      )}
                    </span>
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
              Students Enrolled - {enrollmentCount}
            </p>
            <p>
              <span className="right-icons">
                <PiCellSignalHighLight />
              </span>{" "}
              {courseDetails.course.difficultyLevel} Level
            </p>
            <p>
              <span className="right-icons">
                <IoTimeOutline />
              </span>{" "}
              Duration - {courseDetails.course.courseDuration}
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
      {status === 'pending' && (
  <div className="approve-btn">
    <button onClick={() => handleStatusChange('approved')}> Approve This course</button>
    <button onClick={() => handleStatusChange('rejected')}> Reject This course</button>
  </div>
)}

    </div>
    
  );
};

export default CourseDetailsPage;
