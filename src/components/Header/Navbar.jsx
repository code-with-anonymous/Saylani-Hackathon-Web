import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{backgroundColor: "#000"}}>
         <div className="bar1" style={{ backgroundColor: "#1A1A1A", color: "#C5C5C5" }}>
        <div className="container pt-3 pb-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-3 loc">
              <IoLocationSharp /> 283 N. Glenwood Street, Levittown, NY
            </div>
            <div className="col-6 deal text-center">
              Best special offers every week!{" "}
              <span style={{ color: "#ae845f" }}>40%</span> Off!
            </div>
            <div className="col-3 social-icons text-end">
              <Link to="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="social-icon" />
              </Link>
              <Link to="https://www.twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="social-icon" />
              </Link>
              <Link to="https://www.instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="social-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar