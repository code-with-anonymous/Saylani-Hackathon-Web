import React, { useState } from "react";
import { toast } from "react-toastify";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

const initialState = { name: "", email: "", website: "", message: "" };

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const db = getFirestore(); // Initialize Firestore

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData, // Spread formData to include individual fields
        timestamp: serverTimestamp(),
      });
      setFormData(initialState); // Reset form to initial state
      toast.success("Your form has been sent successfully!"); // Notify user of success
    } catch (err) {
      console.error("Error adding document: ", err);
      toast.error("Oops! Something went wrong while sending your message. Please try again later."); // Notify user of error
    }
  };

  return (
    <div className="container contactForm">
      <div className="row">
        <div className="col-md-8 col-lg-12"> {/* Adjusted column size for responsiveness */}
          <h1 style={{ fontFamily: "Playfair Display", fontSize: "35px" }}>Contact Us</h1>
          <p className="mt-4" style={{ color: "#767676" }}>
            Your email address will not be published. Required fields are marked *
          </p>
          <form onSubmit={handleSubmit} className="contactform">
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="website"
                className="form-control"
                placeholder="Your Website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                name="message"
                className="form-control"
                rows="4"
                placeholder="Message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="btn-container mt-3 text-center">
              <button className="btn4" type="submit">Get In Touch</button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "50px", width: "100%" }}>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: "30px", textAlign: "center" }}>Find Us Here</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0891285459165!2d73.08623897609525!3d31.41167035250359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922681d444b32e1%3A0xc3887a0e53e91f7!2sSaylani%20Mass%20IT%20Training%20FSD!5e0!3m2!1sen!2s!4v1730402999605!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactForm;
