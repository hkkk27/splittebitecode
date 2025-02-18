// assets/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbetMBpDXXJ-s05znVWb51XoNdoe5DZRE",
  authDomain: "splittebitte-69fd3.firebaseapp.com",
  projectId: "splittebitte-69fd3",
  storageBucket: "splittebitte-69fd3.firebasestorage.app",
  messagingSenderId: "963092156062",
  appId: "1:963092156062:web:72c027c9f056e59e21f58f",
  measurementId: "G-49E5G7G2B2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
