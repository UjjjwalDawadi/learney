import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [dollars, setDollars] = useState('');
  const [cents, setCents] = useState('');

  // Function to handle input change for dollars
  const handleDollarsChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value <= 199) {
      setDollars(value);
    }
  };

  // Function to handle input change for cents
  const handleCentsChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value <= 99) {
      setCents(value);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const price = parseFloat(dollars + '.' + cents).toFixed(2);
    console.log('Price:', price); // You can handle the submission logic here
    navigate('/courses');
  };

  // Function to make the course free
  const makeFree = () => {
    setDollars('0');
    setCents('00');
  };

  // Function to determine if the course is free
  const isFree = dollars === '0' && cents === '00';

  return (
    <div className="course-form-container">
      <h1>Pricing</h1>
      <div className="add-course">
        <h2>Set Price</h2>
        <div>
          <input
            type="text"
            pattern="[0-9]*"
            placeholder="Price"
            value={dollars}
            onChange={handleDollarsChange}
            style={{ width: '100px', marginRight: '5px' }}
          />
          <span>$</span>
          <input
            type="text"
            pattern="[0-9]*"
            placeholder="Cents"
            value={cents}
            onChange={handleCentsChange}
            style={{ width: '100px', marginLeft: '5px' }}
          />
          <span>Cents</span>
          <button  onClick={makeFree} style={{ marginLeft: '100px' ,height:'45px',width:'130px',backgroundColor: '#1c1a4a',color:'#fff',fontSize:'16px',fontWeight:'500'}}>Make it Free</button>
        </div>
        <div style={{fontSize:'20px'}}>
          {isFree ? <p> Your course  is priced: <span style={{color:'green',fontWeight:'600'}}>Free</span></p> : <p>Your course is Priced:<span style={{color:'green',fontWeight:'600'}}> $ {dollars}.{cents}</span></p>}
        </div>
      </div>
      <button className='add-course-btn' onClick={handleSubmit} style={{ width: '200px', fontSize: '18px' }}>Submit for Review</button>
    </div>
  );
};

export default Pricing;
