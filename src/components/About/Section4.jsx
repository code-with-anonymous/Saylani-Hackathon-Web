import React from "react";
import image from "../../images/main.jpeg";

const Section4 = () => {
  return (
    <div
      className="container section4"
      style={{ paddingTop: "30px", paddingBottom: "100px" }}
    >
      <div className="row">
        <div className="col-md-6 order-2 order-md-1 d-flex flex-column align-items-center align-items-md-start text-center text-md-start">
          <h2
            style={{ fontFamily: "Playfair-Display", fontSize: "50px" }}
            className="mb-3 "
          >
            Our Mission
          </h2>
          <p className="mt-3 mb-4">
            Complexion-perfecting natural foundation enriched with
            antioxidant-packed superfruits, vitamins, and other skin-nourishing
            nutrients. Creamy liquid formula sets with a pristine matte finish
            for soft, velvety smooth skin. Made using clean, non-toxic
            ingredients, our products are designed for everyone…
            <br/><br/>
            Looking for love in all the wrong places? Start with something pure, something
            good for you, and something that makes you feel pampered like a
            princess. We’re talking about clean beauty gift sets, of course – and we’ve got a bouquet of beauties for yourself or someone you
            love!
          </p>
          <button className="btn btn-dark mt-2">Learn More</button>
        </div>
        <div className="col-md-6 order-1 order-md-2">
          <img
            src={image}
            alt="Spring Winter 2022"
            style={{ width: "100%", height: "auto" }}
            className="mb-2 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Section4;
