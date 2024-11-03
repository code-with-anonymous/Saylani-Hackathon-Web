import React from 'react';
import { Link } from 'react-router-dom';

const Section5 = () => { 

  return (
    <div className='sectionStyless'>
      <h5>Enjoy 10% Off Your First Meal!</h5>
      <h1>Discover Delicious New Flavors</h1>
      <Link to="/shop">
        <button className="btn3">Explore Our Menu</button>
      </Link>
    </div>
  );
};

export default Section5;