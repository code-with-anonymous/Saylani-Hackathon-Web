import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import group from "../../images/Group-2 (1).png"

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        <section>
          <div className="container text-center text-md-start pt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <img
                  src="https://themewagon.github.io/famms/images/logo.png"
                  width="190"
                  alt="Logo"
                />
                <p className="mt-4">
                Our fast food restaurant serves quick, delicious meals like juicy burgers, crispy fries, and refreshing drinks. Enjoy high-quality food with fast, friendly service in a convenient and welcoming atmosphere.
                </p>
                {/* <div className="text-start social-icon">
                  <Link
                    to="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook className="social-icon" />
                  </Link>
                  <Link
                    to="https://www.twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="social-icon" />
                  </Link>
                  <Link
                    to="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="social-icon" />
                  </Link>
                </div> */}
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Categories</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "red", // Change to red
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="#" className="text-dark">
                    Burgers
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                  Pizza
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                    Pasta
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                   Barbecue
                  </Link>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#8B0000", // Change to red
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/shop" className="text-dark">
                    Shop
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="text-dark">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="text-dark">
                    Contact
                  </Link>
                </p>
                <p>
                  <Link to="/orders" className="text-dark">
                    Orders
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "red", // Change to red
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="tel:3075501821" className="text-dark">
                    +309 715 8756
                  </Link>
                </p>
                <p className="mt-2">283 N. Glenwood Street, Levittown, NY</p>
                <p className="text-dark">
                  <Link to="mailto: mrrayyan200@gmail.com" className="text-dark">
                    mrrayyan200@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="row text-center p-3 foot2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        >
          <div className=" col-lg-12 col-md-6 text-white text-center">
            <p>Copyright © {year}. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 col-lg-12 img text-center">
            <img
              src={group}
              alt="group"
              className="text-center"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
