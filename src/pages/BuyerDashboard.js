import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Card, Button, Col, Row, Layout, Form, Input, Modal, notification, Select, Spin } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/_buyerdashboard.scss'; 
import { Link } from 'react-router-dom';
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';  
import Hero from '../components/Shop/Hero';
import { toast } from 'react-toastify';

const { Content } = Layout;

const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState('allProducts');
  const [isSpin, setSpin] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [orders, setOrders] = useState([]);
  const { currentUser, signOut } = useAuth();
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = async () => {
    setSpin(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      const categorySet = new Set(fetchedProducts.map(product => product.category));
      setCategories(Array.from(categorySet));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error fetching products: ${error.message}`,
      });
    } finally {
      setSpin(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
    setWishlist(JSON.parse(localStorage.getItem('wishlist')) || []);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast.success(`${product.name} has been added to your wishlist.`);
    } else {
      toast.info(`${product.name} is already in your wishlist.`);
    }
  };

  const handleOrderModalOpen = (product) => {
    if (!currentUser) {
      notification.error({
        message: 'Error',
        description: 'You must be logged in to place an order.',
      });
      return;
    }

    setOrderDetails({
      cartItems: product ? [product] : [...cart],
      total: product ? product.price : cart.reduce((acc, item) => acc + item.price, 0),
      product,
    });
    setIsOrderModalVisible(true);
  };

  const handleOrder = async (values) => {
    if (!currentUser) {
      notification.error({
        message: 'Error',
        description: 'You must be logged in to place an order.',
      });
      return;
    }

    try {
      const batchOrders = orderDetails.cartItems.map(async (item) => {
        if (!item.sellerEmail) {
          item.sellerEmail = '';
        }

        await addDoc(collection(db, 'orders'), {
          ...item,
          buyerId: currentUser.uid,
          buyerEmail: currentUser.email,
          sellerEmail: item.sellerEmail,
          productName: item.name,
          productPrice: item.price,
          productImage: item.image,
          ...values,
          timestamp: new Date(),
        });
      });

      await Promise.all(batchOrders);

      notification.success({
        message: 'Order Placed',
        description: 'Your order has been placed successfully.',
      });

      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
      setActiveSection('myOrders');
      fetchOrders();
      setIsOrderModalVisible(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error placing order: ${error.message}`,
      });
    }
  };

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      setOrders(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error fetching orders: ${error.message}`,
      });
    }
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${product.name} has been added to your cart.`);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    notification.info({
      message: 'Item Removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      notification.success({
        message: 'Order Canceled',
        description: 'Your order has been canceled successfully.',
      });
      fetchOrders();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error canceling order: ${error.message}`,
      });
    }
  };

  const renderProductList = () => (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <Select
            placeholder="Select category"
            onChange={setSelectedCategory}
            className="mb-3"
            style={{ width: '100%' }}
          >
            <Select.Option value="">All Categories</Select.Option>
            {categories.map(category => (
              <Select.Option key={category} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <Spin size="large" tip="Fetching Products" spinning={isSpin}>
        <div className="row">
          {filteredProducts.slice(0, 12).map((product) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
              <Card
                hoverable
                cover={product.image ? (
                  <Link to={`/singleProduct/${product.id}`}>
                    <img
                      alt={product.name}
                      src={product.image}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </Link>
                ) : null}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ width: '80%', borderColor: 'green', margin: '0' }}
                  >
                    <FaCartPlus /> Cart
                  </Button>,
                  <Button
                    type="default"
                    onClick={() => handleOrderModalOpen(product)}
                    style={{ width: '80%', margin: '0', marginRight: "8px" }}
                  >
                    Order
                  </Button>,
                  <Button
                    type="default"
                    onClick={() => handleAddToWishlist(product)}
                    style={{ width: '80%', margin: '0' }}
                  >
                    <FaRegHeart /> Wishlist
                  </Button>
                ]}
                style={{
                  height: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Card.Meta title={product.name} description={`${product.description.substring(0, 120)}...`} />
                <p className="product-price" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>${product.price}</p>
              </Card>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );

  const renderCart = () => (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setActiveSection('allProducts')}>
        Back to Products
      </Button>
      <h2>Your Cart</h2>
      <Row gutter={[16, 24]}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Card title={item.name}>
                <p>Price: ${item.price}</p>
                <Button type="danger" onClick={() => handleRemoveFromCart(index)}>Remove</Button>
                <Button 
                  type="default" 
                  onClick={() => handleAddToWishlist(item)} 
                  style={{ marginLeft: '8px' }}
                >
                  <FaRegHeart /> Wishlist
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Row>
      <Button type="primary" onClick={() => handleOrderModalOpen()}>Place Order</Button>
    </div>
  );

  const renderMyOrders = () => (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setActiveSection('allProducts')}>
        Back to Products
      </Button>
      <h2>Your Orders</h2>
      <Row gutter={[16, 24]}>
        {orders.length > 0 ? (
          orders.map(order => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={order.id}>
              <Card title={order.productName}>
                <p>Price: ${order.productPrice}</p>
                <p>Status: {order.status}</p>
                <Button type="danger" onClick={() => handleCancelOrder(order.id)}>Cancel Order</Button>
              </Card>
            </Col>
          ))
        ) : (
          <p>You have no orders yet.</p>
        )}
      </Row>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Hero />
        
        {activeSection === 'allProducts' && renderProductList()}
        {activeSection === 'cart' && renderCart()}
        {activeSection === 'myOrders' && renderMyOrders()}
      </Content>
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
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green', borderColor: 'green' }}>Place Order</Button>
          </Form.Item>
        </Form>
        <div>
          {orderDetails.cartItems?.map((item, index) => (
            <div key={index} className="order-item">
              <img alt={item.name} src={item.image} className="order-item-image" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
          <p>Total: ${orderDetails.total}</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default BuyerDashboard;
