import React, { useState } from 'react';

const testimonialsData = [
  {
    id: 1,
    name: 'Anna Trevor',
    role: 'Customer',
    text: 'Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.',
    image:"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" // Example placeholder with text
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Customer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, voluptas nostrum quisquam!',
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Customer',
    text: 'Neque cupiditate assumenda in maiores repudiandae mollitia adipisci maiores repudiandae mollitia consectetur adipisicing architecto elit sed adipiscing elit.',
    image: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, role, text, image } = testimonialsData[currentIndex];

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">Customer's Testimonial</h2>
      <div className="underline"></div>
      <div className="testimonial-container">
        <button className="carousel-control-prev" onClick={handlePrev}>
          <span className="arrow-icon">&larr;</span>
        </button>

        <div className="testimonial-content">
          <img src={image} alt={name} className="customer-image" />
          <h3 className="customer-name">{name}</h3>
          <p className="customer-role">{role}</p>
          <p className="testimonial-text">{text}</p>
        </div>

        <button className="carousel-control-next" onClick={handleNext}>
          <span className="arrow-icon">&rarr;</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
