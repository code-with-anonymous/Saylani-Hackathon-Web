import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { message, Modal, Form, Input, Select, Button } from "antd"; // Ensure you import Modal, Form, Input, Select, and Button

const initialState = { cardName: "", cardNumber: "", expiration: "", cvv: "" };

const Cart = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const [cart, setCart] = useState([]);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ cartItems: [], total: 0 });
  const currentUser = true; // Replace with actual user authentication logic

  const handleChange = (e) =>
    setInput((s) => ({ ...s, [e.target.name]: e.target.value }));

  const fetchProducts = () => {
    try {
      const response = JSON.parse(localStorage.getItem("cart")) || [];
      const groupedCart = response.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity || 1; // Update quantity if it exists
        } else {
          acc.push({ ...item, quantity: item.quantity || 1 }); // Add new item
        }
        return acc;
      }, []);
      setCart(groupedCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const removeCartItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    message.success("Product removed from cart successfully");
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    message.success("Quantity updated successfully");
  };

  const handleOrderModalOpen = () => {
    if (!currentUser) {
      message.error("You must be logged in to place an order.");
      return;
    }

    setOrderDetails({
      cartItems: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    });
    setIsOrderModalVisible(true);
  };

  const handleOrder = (values) => {
    console.log("Order Details: ", values, orderDetails); // Replace this with your order submission logic
    message.success("Order placed successfully!");
    setIsOrderModalVisible(false);
  };

  return (
    <main>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link to="/" className="text-body ">
                          <FaLongArrowAltLeft className="me-2" />
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            {cart.length >= 1
                              ? `You have ${cart.length} items in your cart`
                              : "Your cart is empty"}
                          </p>
                        </div>
                      </div>

                      {cart.length >= 1
                        ? cart.map((item, index) => (
                            <div className="card mb-3" key={index}>
                              <div className="card-body">
                                <div className="d-flex justify-content-between p-3">
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
                                          ? item.description.substring(0, 50)
                                          : "No description available"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div style={{ width: "50px" }}>
                                      <input
                                        type="text"
                                        value={item.quantity || 1}
                                        min="1"
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        className="form-control"
                                      />
                                    </div>
                                    <div style={{ width: "80px" }}>
                                      <h5 className="mb-0">${item.price}</h5>
                                    </div>
                                    <div style={{ width: "80px", marginRight: "20px" }}>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(item.id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    
                    <div className="col p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {cart.length}</h5>
                        <h5>
                          ${" "}
                          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </h5>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>
                          ${" "}
                          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg" 
                        onClick={handleOrderModalOpen}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Order Details"
          visible={isOrderModalVisible}
          onCancel={() => setIsOrderModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleOrder}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
              <Select placeholder="Select payment method">
                <Select.Option value="creditCard">Credit Card</Select.Option>
                <Select.Option value="debitCard">Debit Card</Select.Option>
                <Select.Option value="paypal">PayPal</Select.Option>
                <Select.Option value="bankTransfer">Bank Transfer</Select.Option>
                <Select.Option value="cashOnDelivery">Cash on Delivery</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green', borderColor: 'green' }}>
                Place Order
              </Button>
            </Form.Item>
          </Form>
          <div>
            {orderDetails.cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <img alt={item.name} src={item.image} width={50} height={50} style={{marginRight: "20px"}}/> 
                <span>{item.name} - {item.quantity} x ${(Number(item.price) || 0).toFixed(2)}</span>

              </div>
            ))}
            <h5>
                <b>Total: ${orderDetails.total.toFixed(2)}</b>
            </h5>
          </div>
        </Modal>
      </section>
    </main>
  );
};

export default Cart;
