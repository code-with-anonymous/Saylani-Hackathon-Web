import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

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
                  famms brings you timeless watches crafted for elegance and
                  precision. Discover quality timepieces and shop confidently
                  with our excellent service.
                </p>
                <div className="text-start social-icon">
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
                </div>
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
                    Smart Watches
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                    Stop Watch
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                    Wall Clock
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-dark">
                    Alarm Clock
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
                  <Link to="/#" className="text-dark">
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
                  <Link to="/#" className="text-dark">
                    Help
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
                    +307 550 6821
                  </Link>
                </p>
                <p className="mt-2">283 N. Glenwood Street, Levittown, NY</p>
                <p className="text-dark">
                  <Link to="mailto:muneeb.dev@gmail.com" className="text-dark">
                    muneeb.dev@gmail.com
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
          <div className="col-md-6 text-white">
            Copyright © {year}. All Rights Reserved.
          </div>
          <div className="col-md-6 img">
            <img
              src="http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2022/03/Group-2.png"
              alt=""
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
