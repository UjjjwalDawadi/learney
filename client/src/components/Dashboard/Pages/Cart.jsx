import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from '../../Course/Course'; // Import the Course component
import './Cart.css';

function CartPage() {
  const [cartCourses, setCartCourses] = useState([]);

  useEffect(() => {
    // Fetch cart courses from the backend when the component mounts
    fetchCartCourses();
  }, []);

  // Function to fetch cart courses from the backend
  const fetchCartCourses = async () => {
    try {
      // Make a GET request to fetch cart courses
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/cart/${userId}`);
      setCartCourses(response.data);
    } catch (error) {
      console.error('Error fetching cart courses:', error);
    }
  };

  // Function to handle removing a course from the cart
  const handleRemoveFromCart = async (courseId) => {
    try {
      const userId = localStorage.getItem('userId');
      // Make a DELETE request to remove the course from the cart
      await axios.delete(`/api/cart/${userId}/${courseId}`);
      // After successful deletion, update the cart courses
      fetchCartCourses();
    } catch (error) {
      console.error('Error removing course from cart:', error);
    }
  };

  return (
    <div>
      <h2>Cart Info</h2>
      {/* Render cart courses */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
        {cartCourses.map((cartCourse) => (
          <div key={cartCourse.cartCourseId} > 
            <Course
              title={cartCourse.course.title}
              price={cartCourse.course.price}
              courseDuration={cartCourse.course.courseDuration}
              uploadedBy={cartCourse.course.uploadedBy}
              thumbnailPath={cartCourse.course.thumbnailPath}
              courseId={cartCourse.course.id}
              displayButtons={true}
              isAlreadyInCart={true}
            />
            <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(cartCourse.course.id)}>
              Remove from Cart
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
