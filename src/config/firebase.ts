import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZq5TBqjMwFhTtsArdriIkB1bgy0Nv6Mw",
  authDomain: "cravings-exchange.firebaseapp.com",
  projectId: "cravings-exchange",
  storageBucket: "cravings-exchange.firebasestorage.app",
  messagingSenderId: "775051864316",
  appId: "1:775051864316:web:afb317c45bf1a1cc584f79"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore (The Core Wallet Ledger)
const db = getFirestore(app);

// Initialize Auth
const auth = initializeAuth(app);

export { app, db, auth };