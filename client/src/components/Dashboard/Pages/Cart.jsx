import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from '../../Course/Course'; // Import the Course component
import './Cart.css';
import EmptyPage from '../../../resources/Images/noDataFound.png';

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

  return (
    <div>
      <h2>Cart Info</h2>
      {cartCourses.length === 0 ? (
        <div className='empty-page'>
          <img src={EmptyPage} alt="No data found" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
          {cartCourses.map((cartCourse) => (
            <div key={cartCourse.cartCourseId}>
              <Course
                title={cartCourse.course.title}
                price={cartCourse.course.price}
                courseDuration={cartCourse.course.courseDuration}
                uploadedBy={cartCourse.course.uploadedBy}
                thumbnailPath={cartCourse.course.thumbnailPath}
                courseId={cartCourse.course.id}
                onRemoveFromCart={fetchCartCourses} // Pass the fetchCartCourses function as a callback
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
