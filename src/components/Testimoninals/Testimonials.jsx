import React from 'react';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const testimonialsData = [
  {
    id: 1,
    name: 'Anna Trevor',
    role: 'Customer',
    text: 'Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus .',
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
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
  return (
    <section className="testimonial-section">
  <h1 className='fw-bold'>What Our Customers Say</h1>
  <div className="underline mb-4 ">

  </div>
  <div className="testimonial-cards">
    {testimonialsData.map(({ id, name, role, text, image }) => (
      <div key={id} className="testimonial-card">
        <div className="card-content">
          <p>{text}</p>
          <h4>{name}</h4>
          <span>{role}</span>
        </div>
        <div className="avatar">
          <img src={image} alt={name} />
        </div>
      </div>
    ))}
  </div>
  {/* <div className="testimonial-nav">
    <button className="nav-button"><LeftOutlined /></button>
    <button className="nav-button"><RightOutlined /></button>
  </div> */}
</section>

  );
};

export default Testimonials;
