import React, { useState } from 'react';
import { auth, db } from '../../firebase/config'; // Adjust the path as needed
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import { Form, Input, Button, message, Modal, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
 // Import the SCSS file

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Updated hook

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists) {
        const userRole = userDoc.data().role;
        // Navigate based on the user's role
        if (userRole === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/buyer-dashboard'); // Redirect to the buyer dashboard or any other page
        }
      } else {
        message.error('User role not found.');
        navigate('/');
      }
    } catch (error) {
      message.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists) {
        const userRole = userDoc.data().role;
        // Navigate based on the user's role
        if (userRole === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/buyer-dashboard'); // Redirect to the buyer dashboard or any other page
        }
      } else {
        message.error('User role not found.');
        navigate('/');
      }
    } catch (error) {
      message.error(`Login with Google failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('Password reset email sent!');
      setForgotPasswordVisible(false);
    } catch (error) {
      message.error(`Failed to send password reset email: ${error.message}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          className="login-form"
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" placeholder="Enter your email" className="login-input" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Enter your password" className="login-input" />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Remember me
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-button">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
          <p className="text-center">or</p>
            <Button icon={<GoogleOutlined />} onClick={handleGoogleLogin} loading={loading} className="google-button">
              Login with Google
            </Button>
          </Form.Item>
          <Form.Item>
            <a onClick={() => setForgotPasswordVisible(true)}>Forgot Password?</a>
          </Form.Item>
          <Form.Item className='text-center'>
            <span>Not a user? </span>
            <Link to="/register" className='text-primary'>Register here</Link>
          </Form.Item>
        </Form>
        <Modal
          title="Forgot Password"
          visible={forgotPasswordVisible}
          onCancel={() => setForgotPasswordVisible(false)}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={({ email }) => handleForgotPassword(email)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Password Reset Email
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
