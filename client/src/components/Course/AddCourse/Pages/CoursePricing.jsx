import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');

  // Function to handle input change for price
  const handlePriceChange = (e) => {
    let value = e.target.value;
    // Limit to 3 digits before the decimal point and 2 digits after
    value = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except dot
    const parts = value.split('.');
    if (parts.length > 1) {
      // Limit to 2 decimal places
      parts[1] = parts[1].slice(0, 2);
      value = parts[0].slice(0, 3) + '.' + parts[1];
    } else {
      value = value.slice(0, 3);
    }
    setPrice(value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Price:', price); // You can handle the submission logic here
    navigate('/courses');
  };

  // Function to make the course free
  const makeFree = () => {
    setPrice('0');
  };

  // Function to determine if the course is free
  const isFree = parseFloat(price) === 0;

  return (
    <div className="course-form-container">
      <h1>Pricing</h1>
      <div className="add-course">
        <h2>Set Price</h2>
        <div>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            style={{ width: '200px' }}
          />
          <button onClick={makeFree} style={{ marginLeft: '20px', height: '45px', width: '130px', backgroundColor: '#1c1a4a', color: '#fff', fontSize: '16px', fontWeight: '500' }}>Make it Free</button>
        </div>
        <div style={{ fontSize: '20px' }}>
          {price === '' ? null : (isFree ? <p>Your course is priced: <span style={{ color: 'green', fontWeight: '600' }}>Free</span></p> : <p>Your course is priced: <span style={{ color: 'green', fontWeight: '600' }}>${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>)}
        </div>
      </div>
      <button className='add-course-btn' onClick={handleSubmit} style={{ width: '200px', fontSize: '18px' }}>Submit for Review</button>
    </div>
  );
};

export default Pricing;
