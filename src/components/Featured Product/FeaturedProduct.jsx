import React from "react"; 
import { Link } from "react-router-dom";
import img1 from "../../images/img1.avif";
import img2 from "../../images/mixed-pizza-with-sliced-lemon.avif";
import img3 from "../../images/pasta.jpeg";
import img4 from "../../images/chicken-skewers-hero.jpg";

const FeaturedProducts = ({ addToCart }) => {  
  return (
    <main className="text-center mb-5">
      <h1 className="text-dark mb-5 mt-5 fw-bold ">Featured Categories</h1>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-3 col-md-6 mb-4"> {/* Adjusted to allow better responsiveness */}
            <img
              src={img1}
              alt="Clothes"
              style={{ height: "200px", width: "90%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Burgers</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img2}
              alt="Pizza"
              style={{ height: "200px", width: "90%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Pizza</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img3}
              alt="Pasta"
              style={{ height: "200px", width: "90%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Pasta</h5>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src={img4}
              alt="Barbecue"
              style={{ height: "200px", width: "80%", objectFit: "cover" }}
            />
            <h5 className="text-dark mt-3">Barbecue</h5>
          </div>
        </div>
      </div>
      {/* <div className="button">
        <Link to="/shop">
          <button className="btn btn-danger">View More</button>
        </Link>
      </div> */}
    </main>
  );
};

export default FeaturedProducts;
