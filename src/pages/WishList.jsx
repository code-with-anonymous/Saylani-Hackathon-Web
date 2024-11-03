import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import EmptyWishlist from "../components/WishList/EmptyWishList.jsx";
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = () => {
    try {
      const response = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlistItem = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    message.success("Product removed from wishlist successfully");
  };

  return (
    <main className='text-center mt-4'>
      <Container>
        <Link to="/shop" className="text-body">
          <FaLongArrowAltLeft className="me-2" />
          Continue shopping
        </Link>
        <hr />
        {wishlist.length > 0 ? (
          <Row>
            {wishlist.map((item, index) => (
              <Col md={6} key={index} className="mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src={item.image}
                            className="card-img-top"
                            style={{
                              height: "150px",
                              width: "200px",
                            }}
                            alt={item.name}
                          />
                        </div>
                        <div className="ms-3">
                          <h5>{item.name}</h5>
                          <p className="small mb-0">
                            {item.description && typeof item.description === 'string'
                              ? item.description.substring(0, 120)
                              : "No description available"}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <a className="text-muted" style={{ cursor: "pointer" }} onClick={() => removeWishlistItem(item.id)}>
                          <i className="fas fa-times"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <EmptyWishlist />
        )}
      </Container>
    </main>
  );
};

export default Wishlist;
