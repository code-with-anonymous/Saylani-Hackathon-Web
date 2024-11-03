import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase/config'; // Adjust this import as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts]  = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
      throw error;
    }
  };

  const cartProducts = ()=>{
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    setProducts(cartItems);
    console.log(cartItems)
  }
  useEffect(()=>{
    cartProducts();
  },[])

  return (
    <AuthContext.Provider value={{ currentUser, loading, signOut, products }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);