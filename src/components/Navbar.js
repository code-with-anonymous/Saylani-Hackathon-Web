import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <div className="navbar w-100">
      <Menu mode="horizontal" theme="dark" className="navbar-menu">
        <Menu.Item key="buyer" icon={<AppstoreOutlined />}>
          <Link to="/">Buyer Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="seller" icon={<UserOutlined />}>
          <Link to="/seller">Seller Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />} className="hidden-cart">
          Cart
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
