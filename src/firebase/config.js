// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu5JF5m_eTFHJs-SIZeSjTccPuzuv9kCY",
  authDomain: "ecommerce-app-1d7a4.firebaseapp.com",
  projectId: "ecommerce-app-1d7a4",
  storageBucket: "ecommerce-app-1d7a4.appspot.com",
  messagingSenderId: "596168942689",
  appId: "1:596168942689:web:3996f7b2a9248dc40e7620",
  measurementId: "G-6LGJHWZYMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app);

// Export Firebase services and functions
export {
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  doc,
  setDoc,
  ref,
  uploadBytes,
  uploadBytesResumable
};