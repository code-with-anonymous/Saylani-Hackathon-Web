import React from "react";
import team1 from "../../images/test1.jpg";
import team2 from "../../images/test2.jpg";
import team3 from "../../images/test3.jpg";

const Team = () => {
  return (
    <div className="container">
      <div className="text-center team mb-5">
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "50px" }}>
          We Pride Ourselves On Having A <br /> Team Of Highly Skilled
        </h1>
        <p>Preorder now to receive exclusive deals & gifts</p>
      </div>

      <div className="row" style={{ paddingBottom: "100px" }}>
        <div className="col-md-4 team-member text-center">
          <img
            src={team1}
            className="rounded-circle mb-4"
            alt="Team Member 1"
            style={{ width: "250px", height: "250px", objectFit: "cover" }} // Fixed dimensions
          />
          <h4 style={{ fontFamily: "Playfair Display" }}>John Doe</h4>
          <p>Founder, Chief Creative</p>
        </div>
        <div className="col-md-4 team-member text-center">
          <img
            src={team2}
            className="rounded-circle mb-4"
            alt="Team Member 2"
            style={{ width: "250px", height: "250px", objectFit: "cover" }} // Fixed dimensions
          />
          <h4 style={{ fontFamily: "Playfair Display" }}>Valeriia Nadopta</h4>
          <p>Founder, COO</p>
        </div>
        <div className="col-md-4 team-member text-center">
          <img
            src={team3}
            className="rounded-circle mb-4"
            alt="Team Member 3"
            style={{ width: "250px", height: "250px", objectFit: "cover" }} // Fixed dimensions
          />
          <h4 style={{ fontFamily: "Playfair Display" }}>Jennifer C</h4>
          <p>Founder, CEO</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
