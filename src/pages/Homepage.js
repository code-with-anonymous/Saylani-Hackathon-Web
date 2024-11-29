import React from "react"; 
import "../scss/_home.scss"; // Make sure to import the SCSS file for styling  
import Hero from "../components/HeroSection/Hero"; 
import ChooseUs from "../components/WhyUs/ChooseUs";
import Section5 from "../Section 5/Section5"
import Testimonials from "../components/Testimoninals/Testimonials";
import FeaturedProducts from "../components/Featured Product/FeaturedProduct";
import MenuProducts from "../components/MenuProducts/MenuProducts";


function Home() {
  return (
    <main className="home-page">
      <Hero />
      <FeaturedProducts/>
      <Section5/>
      <ChooseUs/>
      <MenuProducts/>
      <Testimonials/>
      {/* <PopularProducts /> */}
      {/* <Testimonials/> */}
      
      
    </main>
  );
}

export default Home;
