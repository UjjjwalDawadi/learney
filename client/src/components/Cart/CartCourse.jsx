import React from 'react';

function CartCourse({ title, price }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{price}</p>
      {/* Add any other UI elements specific to cart courses */}
    </div>
  );
}

export default CartCourse;
