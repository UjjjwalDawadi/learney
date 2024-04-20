import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Course from '../Course/Course';
import './Cart.css';
import EmptyPage from '../../resources/Images/noDataFound.png';

function CartPage() {
  const [cartCourses, setCartCourses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize navigate variable

  useEffect(() => {
    fetchCartCourses();
  }, []);

  useEffect(() => {
    calculateTotalPrice(cartCourses);
  }, [cartCourses]);

  const fetchCartCourses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/cart/${userId}`);
      setCartCourses(response.data);
    } catch (error) {
      console.error('Error fetching cart courses:', error);
    }
  };

  const calculateTotalPrice = (cartCourses) => {
    let total = 0;
    for (const cartCourse of cartCourses) {
      total += parseFloat(cartCourse.course.price);
    }
    setTotalPrice(total.toLocaleString()); 
  };

  const handlePayment = () => {
    const courseId = cartCourses[0].course.id;
    const price = parseFloat(totalPrice.replace(/,/g, '')); 
  console.log(price)
    navigate('/khalti-payment', { state: { courseId, price } }); 
  };
  

  return (
    <div>
      <h2 style={{ marginLeft: '100px' }}>Cart Info</h2>
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
                uploadedBy={cartCourse.course.uploadedBy}
                thumbnailPath={cartCourse.course.thumbnailPath}
                courseId={cartCourse.course.id}
                onRemoveFromCart={fetchCartCourses}
              />
            </div>
          ))}
        </div>
      )}
      <div className="cart-right">
        <h2>Summary</h2>
        <p>Total <span style={{color:'indigo',fontSize:'25px',fontWeight:'600',marginLeft:'90px'}}>Rs. {totalPrice}</span></p>
        <div>
          <button onClick={handlePayment}>Proceed for payment</button> 
        </div>
      </div>
    </div>
  );
}

export default CartPage;
