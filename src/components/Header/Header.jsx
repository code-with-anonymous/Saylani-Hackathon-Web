import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart, FaSignOutAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { notification } from "antd";
import { useCart } from "../../contexts/CartContext";
import { auth } from "../../firebase/config";
import { useWishlist } from "../../contexts/WishContext";

const Header = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // State for controlling collapse

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      notification.success({
        message: "Logged Out",
        description: "You have been logged out successfully.",
      });
      window.location.href = "/";
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error logging out: ${error.message}`,
      });
    }
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  
  const handleNavLinkClick = (path) => {
    setActiveSection(path);
    setIsCollapsed(true);
    console.log("Navbar collapsed state after link click:", isCollapsed);
  };
  

  return (
    <Navbar bg="light" expand="lg" expanded={!isCollapsed}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://themewagon.github.io/famms/images/logo.png"
            alt="img"
            width="200px"
            height="40px"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle} // Toggle collapse on click
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between text-center text-lg-start"
        >
          <Nav className="mx-auto d-lg-flex flex-column flex-lg-row align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              active={activeSection === "/"}
              onClick={() => handleNavLinkClick("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              active={activeSection === "/about"}
              onClick={() => handleNavLinkClick("/about")}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/shop"
              active={activeSection === "/buyer-dashboard"}
              onClick={() => handleNavLinkClick("/buyer-dashboard")}
            >
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              active={activeSection === "/contact"}
              onClick={() => handleNavLinkClick("/contact")}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/orders"
              active={activeSection === "/my-orders"}
              onClick={() => handleNavLinkClick("/my-orders")}
            >
              My Orders
            </Nav.Link>
          </Nav>
          <div className="d-flex flex-column flex-lg-row align-items-center">
            {isLoggedIn ? (
              <Button
                type="danger"
                onClick={handleLogout}
                className="mb-2 mb-lg-0"
                style={{
                  backgroundColor: "red",
                  border: "0",
                  padding: "10px 30px",
                }}
              >
                <FaSignOutAlt /> Logout
              </Button>
            ) : (
              <Button
                as={Link}
                to="/login"
                className="mb-2 mb-lg-0"
                style={{
                  backgroundColor: "#F44336",
                  border: "0",
                  padding: "10px 30px",
                }}
              >
                Login
              </Button>
            )}
            <div className="icons text-dark p-3 position-relative">
              <Link to="/cart" className="text-dark">
                <FiShoppingCart size={24} />
                <span
                  className="badge bg-danger position-absolute"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.3em 0.5em",
                    borderRadius: "50%",
                  }}
                >
                  {cart?.length}
                </span>
              </Link>
            </div>
            <div className="icons text-dark p-3 position-relative">
              <Link to="/wishlist" className="text-dark">
                <FaRegHeart size={24} />
                <span
                  className="badge bg-danger position-absolute"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.3em 0.5em",
                    borderRadius: "50%",
                  }}
                >
                  {wishlist?.length}
                </span>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
