import React from "react"; 
import { Link } from "react-router-dom";
import img1 from "../../images/img1.avif";
import img2 from "../../images/img6.avif";
import img3 from "../../images/img-2.webp";
import img4 from "../../images/slide3.jpeg";

const FeaturedProducts = ({ addToCart }) => {  
  return (
    <main className="text-center mb-5">
      <h1 className="text-dark mb-5 mt-5">Featured Products</h1>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-3 col-md-6 mb-4"> {/* Adjusted to allow better responsiveness */}
            <img
              src={img1}
              alt="Clothes"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Clothes</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img2}
              alt="Shoes"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Shoes</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img3}
              alt="Grooming"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Grooming</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img4}
              alt="Accessories"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Accessories</h5>
          </div>
        </div>
      </div>
      <div className="button">
        <Link to="#">
          <button className="btn btn-danger">View More</button>
        </Link>
      </div>
    </main>
  );
};

export default FeaturedProducts;
