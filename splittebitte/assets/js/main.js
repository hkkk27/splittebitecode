// assets/js/main.js
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const chatSection = document.getElementById("chat-section");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");

// Register User
registerBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("Registered Successfully!"))
        .catch(err => alert(err.message));
});

// Login User
loginBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("Logged In Successfully!"))
        .catch(err => alert(err.message));
});

// Logout User
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => alert("Logged Out!"));
});

// Auth State Change
onAuthStateChanged(auth, user => {
    if (user) {
        chatSection.style.display = "block";
        logoutBtn.style.display = "inline";
        emailInput.style.display = "none";
        passwordInput.style.display = "none";
        registerBtn.style.display = "none";
        loginBtn.style.display = "none";

        // Real-time Chat
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        onSnapshot(q, snapshot => {
            chatBox.innerHTML = "";
            snapshot.forEach(doc => {
                chatBox.innerHTML += `<p>${doc.data().text}</p>`;
            });
        });
    } else {
        chatSection.style.display = "none";
        logoutBtn.style.display = "none";
        emailInput.style.display = "block";
        passwordInput.style.display = "block";
        registerBtn.style.display = "inline";
        loginBtn.style.display = "inline";
    }
});

// Send Message
sendBtn.addEventListener("click", async () => {
    if (messageInput.value.trim()) {
        await addDoc(collection(db, "messages"), {
            text: messageInput.value,
            timestamp: Date.now()
        });
        messageInput.value = "";
    }
});
