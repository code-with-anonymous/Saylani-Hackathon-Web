import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const PopularProducts = ({addToCart}) => {  
  const [popularProducts, setPopularProducts] = useState([]);
  const PopularProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/carts/2");
      const data = await response.json();
      setPopularProducts(data.products); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    PopularProducts();
  }, []); 
  return (
    <main className="text-center mb-5">
      <h1 className="text-dark mb-5 mt-5">Popular Product</h1>
      <div className="productCard">
        <section>
          <div className="container py-2">
            <div className="row justify-content-center">
              {/* Popular Products  */}
              {popularProducts
                .filter((item, index) => index != 4)
                .map((items, i) => (
                  <div className="col-md-8 col-lg-3 col-xl-3 mb-4" key={i}>
                    <div className="card" style={{ borderRadius: "15px" }}>
                      <img
                        src={items.thumbnail}
                        style={{
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                        }}
                        alt="Laptop"
                      />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <a to="#!" className="text-dark">
                                {items.title}
                              </a>
                            </p>
                            <p className="small text-muted">{items.category}</p>
                          </div>
                          <div>
                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <p className="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between mb-2">
                          <p>
                            <Link to="/" className="text-dark">
                              ${items.price}
                            </Link>
                          </p>
                          <p className="text-dark">
                            Dicount: {items.discountPercentage}
                          </p>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center "> 
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <div className="button">
        <Link to="#">
        <button className="btn btn-danger btn1">View More</button>
        </Link>
      </div>
    </main>
  );
};

export default PopularProducts;
