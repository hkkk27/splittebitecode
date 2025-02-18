// assets/js/main.js
import { auth, db } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const chatSection = document.getElementById("chat-section");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Register User
registerBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Registration successful!");
  } catch (error) {
    alert("Registration error: " + error.message);
    console.error("Registration error:", error);
  }
});

// Login User
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Login successful!");
  } catch (error) {
    alert("Login error: " + error.message);
    console.error("Login error:", error);
  }
});

// Logout User
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert("Logout error: " + error.message);
    console.error("Logout error:", error);
  }
});

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);
  if (user) {
    // User is logged in: show chat section and hide auth fields
    chatSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    emailInput.style.display = "none";
    passwordInput.style.display = "none";
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    // Load chat messages in real time
    loadChatMessages();
  } else {
    // User is logged out: show auth fields and hide chat
    chatSection.style.display = "none";
    logoutBtn.style.display = "none";
    emailInput.style.display = "block";
    passwordInput.style.display = "block";
    registerBtn.style.display = "inline-block";
    loginBtn.style.display = "inline-block";
  }
});

// Load and display chat messages in real time
function loadChatMessages() {
  const messagesQuery = query(collection(db, "messages"), orderBy("timestamp"));
  onSnapshot(messagesQuery, (snapshot) => {
    chatBox.innerHTML = ""; // Clear previous messages
    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageElement = document.createElement("p");
      messageElement.textContent = `${messageData.sender || "Anonymous"}: ${messageData.text}`;
      chatBox.appendChild(messageElement);
    });
    // Auto-scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Send message
sendBtn.addEventListener("click", async () => {
  const text = messageInput.value.trim();
  if (text === "") return; // Prevent sending empty messages
  try {
    await addDoc(collection(db, "messages"), {
      text: text,
      sender: auth.currentUser ? auth.currentUser.email : "Anonymous",
      timestamp: serverTimestamp()
    });
    messageInput.value = ""; // Clear the input field
  } catch (error) {
    alert("Error sending message: " + error.message);
    console.error("Error sending message:", error);
  }
});
