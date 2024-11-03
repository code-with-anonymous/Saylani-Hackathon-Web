import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/_accessdenied.scss'; // Import the SCSS file for custom styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <div className="content">
        <h2 className="title">Access Denied</h2>
        <p className="message">
          Sorry, you don't have permission to access this page.<br />
          <span className='text-danger'>Register as a seller to access this page.</span>
        </p>
        <Link to="/" className="back-link">Go to Login</Link>
      </div>
    </div>
  );
};

export default AccessDenied;
