import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './Course.css';

function Course({ title, price, courseDuration, uploadedBy,status, thumbnailPath,rating,reviewCount, courseId,onRemoveFromCart,onRemoveFromBookmark,
                                      bookmarkId,isOpen,onEditCourse, onDeleteCourse,onDropdownClick}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false); 
  const [isEnrolled, setIsEnrolled] = useState(false); 
  const userRole = localStorage.getItem('userRole');
  const review = reviewCount;


  const fetchEnrollmentStatus = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/enrollments/${userId}`);
      const enrolledCourseIds = response.data.map(enrolledCourse => enrolledCourse.course.id);
      setIsEnrolled(enrolledCourseIds.includes(courseId));
    } catch (error) {
      console.error('Error fetching enrollment status:', error.message);
    }
  }, [courseId]);
  
  const fetchCartData = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/cart/${userId}`);
      const cartCourseIds = response.data.map(cartCourse => cartCourse.course.id);
      setIsInCart(cartCourseIds.includes(courseId));
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  }, [courseId]); 
  
  useEffect(() => {
    const isCourseBookmarked = localStorage.getItem(`bookmark_${localStorage.getItem('userId')}_${courseId}`);
    setIsBookmarked(!!isCourseBookmarked); 

    fetchCartData(); 
    fetchEnrollmentStatus();
  }, [fetchCartData,courseId,fetchEnrollmentStatus]); 


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = () => {
    const encryptedParams = CryptoJS.AES.encrypt(JSON.stringify({ status, enrolled: isEnrolled }), 'secret').toString();
    navigate(`/courses/${courseId}?params=${encodeURIComponent(encryptedParams)}`);
  };
  


  const handleWishlistClick = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (isBookmarked) {
        await axios.delete(`/api/bookmark/${userId}/${courseId}`);
        localStorage.removeItem(`bookmark_${userId}_${courseId}`);
        alert("Bookmark removed");
        setIsBookmarked(false);
        onRemoveFromBookmark(bookmarkId);
      } else {
        await axios.post('/api/bookmarks', { courseId, userId });
        localStorage.setItem(`bookmark_${userId}_${courseId}`, true); 
        alert("Bookmark added");
      }
      setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
    } catch (error) {
      console.error('Bookmark failed:', error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!isInCart) {
        await axios.post('/api/cart', { userId, courseId });
        setIsInCart(true); 
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error.message);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`/api/cart/${userId}/${courseId}`);
      setIsInCart(false); 
      onRemoveFromCart(); 
    } catch (error) {
      console.error('Error removing from cart:', error.message);
    }
  };

  const isCartPage = location.pathname === '/cart';
  const isBookmarkPage = location.pathname === '/dashboard/bookmark';
  const isMyCoursesPage = location.pathname ==='/dashboard/my-courses';
  console.log(isMyCoursesPage)

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''} ${isCartPage ? 'cart-page' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        {userRole === 'Student' && !isCartPage && !isEnrolled && ( 
                <button className="wishlist-btn" onClick={handleWishlistClick}>
                    <span title='Bookmark'>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</span>
                </button>
            )} 
        {userRole === 'Teacher' && isMyCoursesPage &&( 
                <button className="wishlist-btn" onClick={() => onDropdownClick(courseId)}>
                                        <span title=''><BsThreeDotsVertical /></span>

                </button>
            )}
            {isOpen && (
          <div className="dropdown-content">
            <button onClick={() => onDeleteCourse(courseId)} className='dropdown-btn-1' title='Delete This Course'>
              <RiDeleteBinLine /> 
            </button>
            <button onClick={() => onEditCourse(courseId)} className='dropdown-btn-2' title='Edit This Course'>
              <RiEdit2Line /> 
            </button>
          </div>
        )}
      <div className="course-card-inner">
      <img 
  src={thumbnailPath} 
  alt='' 
  className="course-image" 
  onClick={handleClick} 
/>        <div className="course-details">
          <h2>{title}</h2>
          <div style={{ display: 'flex' }} className='rating-review'>
            <p style={{ color: '#ff4a12' }}>
              {rating}<span style={{ color: '#ff9413', fontSize: '19px' }}> ★ </span>
              <span style={{ color: '#ff6811b2', fontSize: '19px' }}>({review})</span>
            </p>
            <p style={{marginLeft:'32px'}}><SiTimescale style={{ fontSize: '19px', verticalAlign: 'middle', marginLeft: '5px', marginRight: '5px' }} />{courseDuration} </p>
          </div>
          {!isEnrolled &&
          <p className='p-r-i-c-e'>{price === '0.00' ? "Free" : `Rs. ${price}`}</p>}
          <p>Uploaded by: {uploadedBy}</p>
        </div>
        
        {userRole === 'Student' && (
  <div>
    {isEnrolled && !isCartPage ? (
      <button className="cart-btn" onClick={() => navigate(`/courses/${courseId}?enrolled=${isEnrolled}`)}>
        Continue Learning
      </button>
    ) : (
      <div>
        {isCartPage && !isBookmarkPage && (
          <button className="cart-btn" onClick={handleRemoveFromCart}>
            <MdOutlineDelete className='del-from-cart'/>
          </button>
        )}
        {!isCartPage && !isBookmarkPage && (
          <button className="cart-btn" onClick={handleAddToCart} >
            {isInCart ? "View in Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    )}
  </div>
)}
      </div>
    </div>
  );
}

export default Course;
