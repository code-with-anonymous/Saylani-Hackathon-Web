// SellerDashboard.jsx
import React, { useState,  } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddProduct from "./Dashboard/AddProduct";
import ManageProducts from "./Dashboard/ManageProducts"; 
import Orders from "./Dashboard/Orders"; 
import Earnings from "./Dashboard/Earnings"; 

const SellerDashboard = () => {
  const { currentUser, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("addProduct");
  const navigate = useNavigate();

 

  return (
    <div>   
      {activeSection === "addProduct" && <AddProduct/> }
      {activeSection === "manageProducts" && <ManageProducts />}
      {activeSection === "orders" && <Orders />}
      {activeSection === "earnings" && <Earnings />}
    </div>
  );
};

export default SellerDashboard;
