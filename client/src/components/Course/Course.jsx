import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiTimescale } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios';

import './Course.css';

function Course({ title, price, courseDuration, uploadedBy, thumbnailPath, courseId, onRemoveFromCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const rating = 4.5;
  const review = 700;

  // Function to check if the course is bookmarked
  const checkIsBookmarked = useCallback(async () => {
    try {
      const response = await axios.get(`/api/bookmarks/${userId}/${courseId}`);
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error.message);
    }
  }, [userId, courseId]);

  // Function to fetch cart data
  const fetchCartData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);
      const cartCourseIds = response.data.map(cartCourse => cartCourse.course.id);
      setIsInCart(cartCourseIds.includes(courseId));
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  }, [userId, courseId]);

  useEffect(() => {
    checkIsBookmarked();
    fetchCartData();
  }, [checkIsBookmarked, fetchCartData]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWishlistClick = async () => {
    try {
      if (isBookmarked) {
        await axios.delete(`/api/bookmark/${userId}/${courseId}`);
        alert("Bookmark removed");
      } else {
        await axios.post('/api/bookmarks', { courseId, userId });
        alert("Bookmark added");
      }
      setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
    } catch (error) {
      console.error('Bookmark failed:', error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!isInCart) {
        await axios.post('/api/cart', { userId, courseId });
        setIsInCart(true);
      } else {
        navigate('../dashboard/cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error.message);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`/api/cart/${userId}/${courseId}`);
      setIsInCart(false);
      onRemoveFromCart();
    } catch (error) {
      console.error('Error removing from cart:', error.message);
    }
  };

  const isCartPage = location.pathname === '/dashboard/cart';
  const isBookmarkPage = location.pathname === '/dashboard/bookmark';

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {userRole === 'Student' && !isCartPage && (
        <button className="wishlist-btn" onClick={handleWishlistClick}>
          <span title='Bookmark'>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</span>
        </button>
      )}
      <div className="course-card-inner">
        <img src={thumbnailPath} alt='' className="course-image" onClick={() => navigate(`/courses/${courseId}`)} />
        <div className="course-details">
          <h2>{title}</h2>
          <div style={{ display: 'flex' }}>
            <p style={{ color: '#ff4a12' }}>
              {rating}<span style={{ color: '#ff9413', fontSize: '19px' }}> ★ </span>
              <span style={{ color: '#ff6811b2', fontSize: '19px' }}>({review})</span>
            </p>
            <p style={{ marginLeft: '32px' }}><SiTimescale style={{ fontSize: '19px', verticalAlign: 'middle', marginLeft: '5px', marginRight: '5px' }} />{courseDuration} </p>
          </div>
          <p>{price === '0.00' ? "Free" : `Rs. ${price}`}</p>
          <p>Uploaded by: {uploadedBy}</p>
        </div>
        {userRole === 'Student' && (
          <div>
            {isCartPage && !isBookmarkPage && (
              <button className="cart-btn" onClick={handleRemoveFromCart}>
                Remove from Cart
              </button>
            )}
            {!isCartPage && !isBookmarkPage && (
              <button className="cart-btn" onClick={handleAddToCart}>
                {isInCart ? "View in Cart" : "Add to Cart"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
