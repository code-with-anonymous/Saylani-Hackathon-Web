import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="container-fluid mt-100 mb-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-body-primary"> 
            </div>
            <div className="card-body cart">
              <div className="col-sm-12 empty-cart-cls text-center">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  width="130"
                  height="130"
                  className="img-fluid mb-4 mr-3"
                  alt="Empty Cart"
                />
                <h3><strong>Your Whislist is Empty</strong></h3>
                <h4>Add something to make me happy </h4> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;