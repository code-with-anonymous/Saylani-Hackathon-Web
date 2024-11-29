import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

export default function MenuProducts() {
  const [activeSection, setActiveSection] = useState('allProducts');
  const [isSpin, setSpin] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState([]);
  const { currentUser, signOut } = useAuth();
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [visibleProducts, setVisibleProducts] = useState(4); // New state to control visible products
  const navigate =useNavigate();
  const fetchProducts = async () => {
    setSpin(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(fetchedProducts);
      const categorySet = new Set(fetchedProducts.map(product => product.category));
      setCategories(Array.from(categorySet));
      console.log('Products fetched:', fetchedProducts);  // Log fetchedProducts, not products
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
    fetchProducts(); // Fetch products only once on mount
  }, []); // Empty dependency array ensures it only runs on mount

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${product.name} has been added to your cart.`);
    navigate('/cart')
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
      setIsOrderModalVisible(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Error placing order: ${error.message}`,
      });
    }
  };

  const handleViewMore = () => {
    setVisibleProducts(prevCount => prevCount + 4); // Load 4 more products on each click
  };

  return (
    <>
      <h1 className="heading text-center fw-bold">Our Products</h1>
      <div className="underline"></div>
      
      <div className="menu-container">
        <Spin spinning={isSpin} tip="Loading products...">
          <div className="grid-container">
            {products.slice(0, visibleProducts).map((product, index) => (
              <div className="food-card" key={index}>
                {product.image && (
                  <img src={product.image} alt={product.name} className="food-image" />
                )}
                <div className="hover-overlay">
                  <button className="hover-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  <button className="hover-button buy-now" onClick={() => handleOrderModalOpen(product)}>Order Now</button>
                </div>
                <div className="food-info">
                  <span className="dish-name">{product.name}</span>
                  <span className="dish-price">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </div>
      
      {visibleProducts < products.length && (
        <div className="col text-center button mt-3 mb-4 m-0">
          <button onClick={handleViewMore} className="btn btn-danger">View More</button>
        </div>
      )}

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
    </>
  );
}




















// I just want to see the fetch product data in console:import React, { useState} from 'react';
// import { collection, getDocs } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase/config";
// import { notification } from "antd";

// export default function MenuProducts() {

//   const [products, setProducts] = useState([]);
//   const [isSpin, setSpin] = useState(false);
//   const [categories, setCategories] = useState([]);


//   const fetchProducts = async () => {
//     setSpin(true);
//     try {
//       const querySnapshot = await getDocs(collection(db, 'products'));
//       const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setProducts(fetchedProducts);
//       const categorySet = new Set(fetchedProducts.map(product => product.category));
//       setCategories(Array.from(categorySet));
//     } catch (error) {
//       notification.error({
//         message: 'Error',
//         description: Error fetching products: ${error.message},
//       });
//     } finally {
//       setSpin(false);
//       console .log('Products fetched:', products);
//     }
//   };
//   fetchProducts()


//   const menuItems = [
//     {
//       dish_name: "Classic Cheeseburger",
//       dish_price: 8.99,
//       dish_image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?t=st=1730908646~exp=1730912246~hmac=02974d1132ed827f9bfd5469cd097851352b9aec0498bd1579d8e46a183f6408&w=826",
//     },

//     {
//       dish_name: "Bacon Burger",
//       dish_price: 10.49,
//       dish_image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?t=st=1730908646~exp=1730912246~hmac=02974d1132ed827f9bfd5469cd097851352b9aec0498bd1579d8e46a183f6408&w=826",
//     },

//     {
//       dish_name: "Veggie Burger",
//       dish_price: 7.99,
//       dish_image: "https://img.freepik.com/premium-photo/oven-baked-italian-pizza-with-sauce-cheese-mushrooms-bell-peppers-olives-composition-with-ingredients-dark-table-top-view-vegetarian-pizza_207126-5094.jpg?ga=GA1.1.599700962.1723454044&semt=ais_hybrid",
//     },

//     {
//       dish_name: "Double Cheeseburger",
//       dish_price: 12.99,
//       dish_image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?t=st=1730908646~exp=1730912246~hmac=02974d1132ed827f9bfd5469cd097851352b9aec0498bd1579d8e46a183f6408&w=826",
//     },

//     {
//       dish_name: "Spicy Chicken Burger",
//       dish_price: 9.99,
//       dish_image: "https://img.freepik.com/premium-photo/vegetable-skewers-white-plate-with-some-raw-ingredientes-around_269313-35.jpg?w=826",
//     },

//     {
//       dish_name: "Grilled Chicken Sandwich",
//       dish_price: 8.49,
//       dish_image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?t=st=1730908646~exp=1730912246~hmac=02974d1132ed827f9bfd5469cd097851352b9aec0498bd1579d8e46a183f6408&w=826",
//     },

//     {
//       dish_name: "Fish Burger",
//       dish_price: 11.99,
//       dish_image: "https://img.freepik.com/free-photo/top-view-chicken-pizza-with-yellow-cherry-tomatoes-bell-pepper-board_141793-3971.jpg?ga=GA1.1.599700962.1723454044&semt=ais_hybrid",
//     },

//     {
//       dish_name: "BBQ Bacon Cheeseburger",
//       dish_price: 13.49,
//       dish_image: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill-tasty-food-weekend-meal_2829-7043.jpg?t=st=1730908646~exp=1730912246~hmac=02974d1132ed827f9bfd5469cd097851352b9aec0498bd1579d8e46a183f6408&w=826",
//     },

   
  
//   ];

//   return (
//     <>
//     <h1 className="heading text-center fw-bold">Our Products</h1>
//     <div className="underline"></div>
//     <div className="menu-container">   
//       <div className="grid-container">
//         {menuItems.map((item, index) => (
//           <div className="food-card" key={index}>
//             <img src={item.dish_image} alt={item.dish_name} className="food-image" />
//             <div className="hover-overlay">
//               <button className="hover-button">Add to Cart</button>
//               <button className="hover-button buy-now">Buy Now</button>
//             </div>
//             <div className="food-info">
//               <span className="dish-name">{item.dish_name}</span>
//               <span className="dish-price">${item.dish_price}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className=" col text-center button mt-3 mb-4 m-0">
//         <Link to="/shop">
//           <button className="btn btn-danger">View More</button>
//         </Link>
//       </div>
//     </>
//   );
// }