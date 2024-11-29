import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "antd";

const EmptyCart = () => {
  return (
    <div className="empty-cart ">
      {/* <div className="empty-cart-icon">
        <FaShoppingCart size={50} color="#888" />
      </div> */}
      <h2>Your cart is currently empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <Link to="/">
        <Button type="primary" size="large">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
