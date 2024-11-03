// src/pages/PageNotFound.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../scss/_pagenotfound.scss';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <FaExclamationTriangle className="icon" />
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link className='text-center' to='/'>Go to Home</Link>
    </div>
   
  );
};

export default PageNotFound;
