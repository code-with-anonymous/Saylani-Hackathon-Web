
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SellerDashboard from './pages/SellerDashboard';
import AccessDenied from './pages/AccessDenied';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import './App.scss';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact';
import Header from './components/Header/Header';
import Navbar from './components/Header/Navbar';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';
import Order from './components/Orders/Order';
import AddProduct from './pages/Dashboard/AddProduct';
import ManageProducts from './pages/Dashboard/ManageProducts';
import Earnings from './pages/Dashboard/Earnings';
import Orders from './pages/Dashboard/Orders';
import SellerHeader from './components/Header/SellerHeader';
import SingleProduct from './components/Single Product Page/SingleProduct';
import Spinners from './components/Spinner/Spinner';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BuyerDashboard from './pages/BuyerDashboard';
import { WishlistProvider } from './contexts/WishContext';
import Wishlist from './pages/WishList';

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { currentUser } = useAuth();
  useEffect(() => {
    // Simulating a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinners />; // Show spinner while loading
  }
  

  // Check if the current path is either "/login" or "/register"
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  // Redirect to homepage if user is logged in and tries to access login or register page
  if (currentUser && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {/* Render specific headers based on the route */}
      {!hideHeaderFooter && (
        location.pathname.startsWith('/seller-dashboard') || 
        location.pathname.startsWith('/add-product') || 
        location.pathname.startsWith('/manage-products') || 
        location.pathname.startsWith('/earnings') || 
        location.pathname.startsWith('/my-orders') ? (
          <>
            <Navbar />
            <SellerHeader />
          </>
        ) : (
          <>
            <Navbar />
            <Header />
          </>
        )
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<BuyerDashboard/>} />
        <Route path="/singleProduct/:productId" element={<SingleProduct/>} /> 
        <Route path="/seller-dashboard" element={<PrivateRoute element={<SellerDashboard />} />} />
        <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/manage-products" element={<PrivateRoute element={<ManageProducts />} />} />
        <Route path="/earnings" element={<PrivateRoute element={<Earnings />} />} />
        <Route path="/my-orders" element={<PrivateRoute element={<Orders />} />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <WishlistProvider>
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
      <ToastContainer />
    </AuthProvider>
    </WishlistProvider>
  );
};

export default App;