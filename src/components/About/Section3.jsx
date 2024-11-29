import React from "react";
import about1 from "../../images/about-1.png";
import about2 from "../../images/about-2.png";

const Section3 = () => {
  return (
    <div
      className="section3 text-center pt-3 pb-5 mb-3"
      style={{
        backgroundColor: "#F5F3F2",
      }}
    >
      <div className="mb-5 pt-5">
        <p>
          “We are community-led, with a continued commitment to be the most
          responsible <br /> version of ourselves – and we never rest on our
          laurels.”
        </p>
      </div>
      <div className="row justify-content-center mt-4">
        {/* Logo images with responsive column sizes */}
        <div className="col-lg-2 col-md-3 col-6 mb-4">
          <img
            src={about1}
            alt="Company Logo 1"
            className="img-fluid" // Ensures responsive images
            style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
          />
        </div>
        <div className="col-lg-2 col-md-3 col-6 mb-4">
          <img
            src={about2}
            alt="Company Logo 2"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-lg-2 col-md-3 col-6 mb-4">
          <img
            src={about1}
            alt="Company Logo 3"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-lg-2 col-md-3 col-6 mb-4">
          <img
            src={about2}
            alt="Company Logo 4"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
