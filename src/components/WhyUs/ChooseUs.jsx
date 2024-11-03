import React from 'react';
import { FaTruck, FaAward, FaShippingFast } from 'react-icons/fa';

const ChooseUs = () => {
  const items = [
    { icon: <FaTruck />, title: "Fast Delivery", description: "variations of passages of Lorem Ipsum available" },
    { icon: <FaShippingFast />, title: "Free Shipping", description: "variations of passages of Lorem Ipsum available" },
    { icon: <FaAward />, title: "Best Quality", description: "variations of passages of Lorem Ipsum available" },
  ];

  return (
    <div className="why-shop-with-us">
      <h2>Why Shop With Us</h2>
      <div className="underline"></div>
      <div className="benefits">
        {items.map((item, index) => (
          <div key={index} className="benefit-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
