import React from "react";

const Section3 = () => {
  return (
    <div
      className="section3 text-center pt-3 pb-5"
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
        {/* Logo images with improved styling */}
        <div className="col-md-2 col-6 mb-4">
          <img
            src="http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/elementor/thumbs/Partner1-pma4njf7yeuau2jy2dq0ljouoyv9q5zyrjsjx07pug.png"
            alt="Company Logo 1"
            className="img-fluid" // Ensures responsive images
            style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src="http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/elementor/thumbs/Layer-11-pma4n4dsxxueh3wrl94qj9ycds4c38d6wrv1f3l42u.png"
            alt="Company Logo 2"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src="http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/elementor/thumbs/Partner1-pma4njf7yeuau2jy2dq0ljouoyv9q5zyrjsjx07pug.png"
            alt="Company Logo 3"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-2 col-6 mb-4">
          <img
            src="http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/elementor/thumbs/Layer-11-pma4n4dsxxueh3wrl94qj9ycds4c38d6wrv1f3l42u.png"
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
