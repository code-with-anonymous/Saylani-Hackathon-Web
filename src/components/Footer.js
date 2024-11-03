
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/_footer.scss";
import { db } from '../firebase/config'; // Adjust the path as necessary

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });
      setName("");
      setEmail("");
      setMessage("");
      alert("Message sent successfully!");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <footer className="footer">
      <div className="overlay"></div>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to our platform where you can seamlessly interact with buyers
            and sellers. We aim to provide the best online experience for our
            users.
          </p>
        </div>

        <div className="footer-section quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/seller-dashboard">Seller Dashboard</Link></li>
            <li><Link to="/buyer-dashboard">Buyer Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
