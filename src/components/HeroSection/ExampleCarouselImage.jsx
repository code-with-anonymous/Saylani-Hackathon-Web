import React from "react";
import PropTypes from "prop-types"; 

const ExampleCarouselImage = ({ imageSrc }) => (
  <div className="image">
     <img
    className="d-block w-100"
    src={imageSrc}  
    alt="Carousel Slide"
  />
  </div>
);

ExampleCarouselImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,  
};

export default ExampleCarouselImage;