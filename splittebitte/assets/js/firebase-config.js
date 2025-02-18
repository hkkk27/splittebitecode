// assets/js/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbetMBpDXXJ-s05znVWb51XoNdoe5DZRE",
  authDomain: "splittebitte-69fd3.firebaseapp.com",
  projectId: "splittebitte-69fd3",
  storageBucket: "splittebitte-69fd3.appspot.com",
  messagingSenderId: "963092156062",
  appId: "1:963092156062:web:72c027c9f056e59e21f58f",
  measurementId: "G-49E5G7G2B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
