import React from 'react';

const Spinner = ({ color = '#007bff' }) => {
  return (
    <div className="spinner-overlay">
      <div className="lds-ring" style={{ color }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
