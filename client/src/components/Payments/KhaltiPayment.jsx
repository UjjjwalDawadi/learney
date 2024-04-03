import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import KhaltiLogo from '../../resources/Images/Khalti-Logo.png';

const KhaltiPaymentComponent = () => {
  const location = useLocation();
  const { courseId, price } = location.state;
  const newPrice = parseInt(price) * 100;
  const navigate = useNavigate();
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const initiatePayment = async () => {
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');

    try {
      const returnUrl = `http://localhost:3000/courses/${courseId}`;

      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/initiate/',
        {
          success: 'true',
          return_url: returnUrl,
          website_url: 'http://localhost:3000',
          amount: newPrice,
          purchase_order_id: 'Order01',
          purchase_order_name: 'test',
          customer_info: {
            name: name,
            email: email,
          },
        },
        {
          headers: {
            Authorization: 'key 38aad173fdf6499692ee468b8cedfeec',
            'Content-Type': 'application/json',
          },
        }
      );

      // Set state to indicate payment initiated successfully
      setPaymentInitiated(true);

      const paymentUrl = response.data.payment_url;
      window.location.href = paymentUrl;

      // Send payment details to your backend after payment initiation
      await axios.post('/api/payment', {
        amount: price,
        method: 'Khalti',
        courseId: courseId,
        userId: localStorage.getItem('userId'),
        status: 'pending'
      });

      // Create enrollment record after successful payment
      await axios.post('/api/enrollment', {
        userId: localStorage.getItem('userId'),
        courseId: courseId,
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle errors
    }
  };

  // Redirect to another page after payment is initiated and backend call is completed
  if (paymentInitiated) {
    navigate('dashboard/enrolled-courses');
  }

  return (
    <div>
      <img src={KhaltiLogo} alt="khalti" />
      <button onClick={initiatePayment}>Pay with Khalti</button>
    </div>
  );
};

export default KhaltiPaymentComponent;
