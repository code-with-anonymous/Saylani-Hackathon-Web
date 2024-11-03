// SellerHeader.jsx
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { notification, Button } from "antd";
import { auth } from "../../firebase/config"; // Ensure you import your Firebase auth config

const SellerHeader = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(location.pathname);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        // Clean up subscription on unmount
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
                description: `Error logging out: ${error.message}`, // Fixed template literal syntax
            });
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="p-3">
            <Container>
                <Navbar.Brand as={Link} to="/">
                <img src="https://themewagon.github.io/famms/images/logo.png" alt="" width="230px" height="40px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="mx-auto">
                        <Nav.Link
                            as={Link}
                            to="/add-product"
                            active={activeSection === "/add-product"}
                            onClick={() => setActiveSection("/add-product")}
                        >
                            Add Product
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/manage-products"
                            active={activeSection === "/manage-products"}
                            onClick={() => setActiveSection("/manage-products")}
                        >
                            Manage Products
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/my-orders"
                            active={activeSection === "/my-orders"}
                            onClick={() => setActiveSection("/my-orders")}
                        >
                            My Orders
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/earnings"
                            active={activeSection === "/earnings"}
                            onClick={() => setActiveSection("/earnings")}
                        >
                            Earnings
                        </Nav.Link>
                    </Nav>
                    {isLoggedIn ? (
                        <Button type="primary" danger onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </Button>
                    ) : (
                        <Button type="primary" as={Link} to="/login">
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SellerHeader;
