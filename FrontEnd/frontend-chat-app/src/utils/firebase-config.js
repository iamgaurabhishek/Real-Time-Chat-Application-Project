// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWJSO2QUkfuJYbLSUT48tm7plio1tc_r4",
  authDomain: "real-time-chat-application-ag.firebaseapp.com",
  projectId: "real-time-chat-application-ag",
  storageBucket: "real-time-chat-application-ag.appspot.com",
  messagingSenderId: "645078584313",
  appId: "1:645078584313:web:6f0bdb594785cc71ca0b28",
  measurementId: "G-12P91QTL3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();