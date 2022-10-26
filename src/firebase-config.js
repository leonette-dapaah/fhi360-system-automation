// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUTxzR9CgKpgNU2nFfTXKwVWcaEVQ86h4",
  authDomain: "fhi360-sys-automation.firebaseapp.com",
  projectId: "fhi360-sys-automation",
  storageBucket: "fhi360-sys-automation.appspot.com",
  messagingSenderId: "182121531282",
  appId: "1:182121531282:web:6eabf8e2c8c31202da634b",
  measurementId: "G-4GFX1RC2J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const db = app.firestore;