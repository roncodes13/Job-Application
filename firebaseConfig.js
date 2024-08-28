import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnh-NIz7-3Blc-7lq7P9mUWhHIzY8pvJc",
  authDomain: "internshipassignment-dd3af.firebaseapp.com",
  projectId: "internshipassignment-dd3af",
  storageBucket: "internshipassignment-dd3af.appspot.com",
  messagingSenderId: "30932462600",
  appId: "1:30932462600:web:a153e69b790de6dc6275bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-Up Function
const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      uid: user.uid,
    });

    console.log("User signed up and data saved:", user);
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

// Login Function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// Event Listeners for Sign-Up and Login Buttons
document.getElementById("signUpButton").addEventListener("click", () => {
  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  signUp(name, email, password);
});

document.getElementById("loginButton").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});
